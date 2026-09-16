/**
 * The bouncing ball: a small physics toy that treats the real page as its level.
 *
 * When it starts it wraps every word on the page in a span, measures those spans and the
 * page's solid boxes (images, buttons, anything marked `data-bounce`) once, and keeps the
 * results in document coordinates. Each frame it subtracts the scroll offset, so the ball
 * lives in the viewport while the obstacles scroll past it. The ball is a circle, every
 * obstacle is an axis-aligned rectangle, and the collision test is closest-point-on-rect.
 * Words the ball hits get a `bw-hit` class that nudges them away for a moment (globals.css).
 *
 * The pointer is a round paddle. Pressing on the ball grabs it; letting go throws it.
 * Speed always relaxes back towards BASE_SPEED, so a throw wears off. There is no gravity.
 *
 * Everything is undone by the returned stop function: spans are unwrapped (the original
 * text nodes are put back, so React's references stay valid) and listeners are removed.
 */

type Obstacle = { x: number; y: number; w: number; h: number; el: HTMLElement; word: boolean; hitAt: number };

const BASE_SPEED = 380; // px per second, the cruising speed
const MAX_SPEED = 1100; // cap after a throw or a hard paddle hit
const PADDLE_RADIUS = 22;
const NUDGE_PX = 6;
const TRAIL = 12;

/** Text inside these is never wrapped: buttons and inputs re-render their own text. */
const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "SVG", "NOSCRIPT", "BUTTON", "INPUT", "TEXTAREA", "SELECT", "CANVAS"]);
/** Boxes the ball bounces off as a whole. Words inside them are not wrapped. */
const SOLID_SELECTOR = "[data-bounce], img, button, .ticker";

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Splits every text node under `roots` into per-word spans. Returns the spans and an undo. */
function wrapWords(roots: HTMLElement[]) {
  const spans: HTMLSpanElement[] = [];
  const undo: (() => void)[] = [];
  for (const root of roots) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !/\S/.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        for (let el = node.parentElement; el && el !== root; el = el.parentElement) {
          if (SKIP_TAGS.has(el.tagName.toUpperCase()) || el.matches(SOLID_SELECTOR) || el.getAttribute("aria-hidden") === "true") {
            return NodeFilter.FILTER_REJECT;
          }
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    const texts: Text[] = [];
    while (walker.nextNode()) texts.push(walker.currentNode as Text);
    for (const text of texts) {
      const parent = text.parentNode;
      if (!parent) continue;
      const frag = document.createDocumentFragment();
      const inserted: Node[] = [];
      for (const part of text.nodeValue!.split(/(\s+)/)) {
        if (!part) continue;
        let node: Node;
        if (/^\s+$/.test(part)) {
          node = document.createTextNode(part);
        } else {
          const span = document.createElement("span");
          span.className = "bw";
          span.textContent = part;
          spans.push(span);
          node = span;
        }
        inserted.push(node);
        frag.appendChild(node);
      }
      parent.insertBefore(frag, text);
      parent.removeChild(text);
      undo.push(() => {
        if (inserted[0]?.parentNode === parent) parent.insertBefore(text, inserted[0]);
        for (const n of inserted) if (n.parentNode === parent) parent.removeChild(n);
      });
    }
  }
  return { spans, restore: () => undo.reverse().forEach((fn) => fn()) };
}

/** Solid boxes, skipping any nested inside another solid (an image inside a logo tile). */
function collectSolids(roots: HTMLElement[]): HTMLElement[] {
  const out: HTMLElement[] = [];
  for (const root of roots) {
    for (const el of root.querySelectorAll<HTMLElement>(SOLID_SELECTOR)) {
      if (el.parentElement?.closest(SOLID_SELECTOR)) continue;
      out.push(el);
    }
  }
  return out;
}

export function startBounce(canvas: HTMLCanvasElement, onStop: () => void): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const roots = [document.querySelector("main"), document.querySelector("footer")].filter((n): n is HTMLElement => n instanceof HTMLElement);
  const header = document.querySelector("header");
  const radius = window.innerWidth < 640 ? 11 : 14;

  const { spans, restore } = wrapWords(roots);
  const solids = collectSolids(roots);
  let obstacles: Obstacle[] = [];

  const scan = () => {
    const sx = window.scrollX;
    const sy = window.scrollY;
    const next: Obstacle[] = [];
    const add = (el: HTMLElement, word: boolean) => {
      const b = el.getBoundingClientRect();
      if (b.width > 0 && b.height > 0) next.push({ x: b.left + sx, y: b.top + sy, w: b.width, h: b.height, el, word, hitAt: 0 });
    };
    for (const s of spans) add(s, true);
    for (const s of solids) add(s, false);
    obstacles = next;
  };
  let scanTimer = 0;
  const scheduleScan = () => {
    clearTimeout(scanTimer);
    scanTimer = window.setTimeout(scan, 120);
  };
  scan();

  // ---- Canvas sizing ----
  let W = window.innerWidth;
  let H = window.innerHeight;
  const fit = () => {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  fit();

  // ---- State ----
  const ball = { x: W / 2, y: H / 2, vx: 0, vy: 0 };
  const pointer = { x: -1e4, y: -1e4, vx: 0, vy: 0, active: false, touch: false, t: 0 };
  let grabbed = false;
  let suppressClick = false;
  const trail: { x: number; y: number }[] = [];
  let color = "#b8491f";
  let colorAt = 0;
  let cursor = "";
  let headerBox: DOMRect | null = null;

  const setSpeed = (s: number) => {
    const cur = Math.hypot(ball.vx, ball.vy);
    if (cur < 1e-3) {
      const a = Math.random() * Math.PI * 2;
      ball.vx = Math.cos(a) * s;
      ball.vy = Math.sin(a) * s;
    } else {
      ball.vx *= s / cur;
      ball.vy *= s / cur;
    }
  };

  /** Is a circle at (x, y) clear of every obstacle and the viewport edge? */
  const isFree = (x: number, y: number, r: number) => {
    if (x < r || y < r || x > W - r || y > H - r) return false;
    if (headerBox && y - r < headerBox.bottom) return false;
    const sx = window.scrollX;
    const sy = window.scrollY;
    for (const o of obstacles) {
      const cx = clamp(x, o.x - sx, o.x - sx + o.w);
      const cy = clamp(y, o.y - sy, o.y - sy + o.h);
      if ((x - cx) ** 2 + (y - cy) ** 2 < r * r) return false;
    }
    return true;
  };

  const spawn = () => {
    headerBox = header?.getBoundingClientRect() ?? null;
    for (let i = 0; i < 300; i++) {
      // Random points, biased towards the middle of the screen.
      const x = W * (0.5 + (Math.random() - 0.5) * Math.min(1, 0.3 + i / 100));
      const y = H * (0.5 + (Math.random() - 0.5) * Math.min(1, 0.3 + i / 100));
      if (isFree(x, y, radius + 8)) {
        ball.x = x;
        ball.y = y;
        break;
      }
    }
    const a = -Math.PI / 4 + (Math.random() - 0.5) * 0.6; // up and to the right, roughly
    ball.vx = Math.cos(a) * BASE_SPEED;
    ball.vy = Math.sin(a) * BASE_SPEED;
  };
  spawn();

  // ---- Word nudge ----
  const nudge = (el: HTMLElement, dx: number, dy: number) => {
    el.style.setProperty("--nx", `${(dx * NUDGE_PX).toFixed(1)}px`);
    el.style.setProperty("--ny", `${(dy * NUDGE_PX).toFixed(1)}px`);
    if (el.classList.contains("bw-hit")) {
      el.classList.remove("bw-hit");
      void el.offsetWidth; // restart the animation
    }
    el.classList.add("bw-hit");
  };
  const onAnimationEnd = (e: AnimationEvent) => {
    if (e.animationName === "bw-nudge" && e.target instanceof HTMLElement) e.target.classList.remove("bw-hit");
  };
  document.addEventListener("animationend", onAnimationEnd);

  // ---- Collision ----
  /** Pushes the ball out of a rectangle and reflects it. Returns the contact normal on a real hit. */
  const resolveRect = (x: number, y: number, w: number, h: number) => {
    const cx = clamp(ball.x, x, x + w);
    const cy = clamp(ball.y, y, y + h);
    const dx = ball.x - cx;
    const dy = ball.y - cy;
    const d2 = dx * dx + dy * dy;
    if (d2 >= radius * radius) return null;
    let nx: number;
    let ny: number;
    if (d2 > 1e-6) {
      const d = Math.sqrt(d2);
      nx = dx / d;
      ny = dy / d;
      ball.x = cx + nx * radius;
      ball.y = cy + ny * radius;
    } else {
      // The centre is inside the box (a scroll moved a paragraph over it). Leave by the nearest side.
      const l = ball.x - x;
      const r = x + w - ball.x;
      const t = ball.y - y;
      const b = y + h - ball.y;
      const m = Math.min(l, r, t, b);
      if (m === l) [nx, ny, ball.x] = [-1, 0, x - radius];
      else if (m === r) [nx, ny, ball.x] = [1, 0, x + w + radius];
      else if (m === t) [nx, ny, ball.y] = [0, -1, y - radius];
      else [nx, ny, ball.y] = [0, 1, y + h + radius];
    }
    const dot = ball.vx * nx + ball.vy * ny;
    if (dot >= 0) return null; // already moving away
    ball.vx -= 2 * dot * nx;
    ball.vy -= 2 * dot * ny;
    // A touch of randomness so the ball never settles into a perfect back-and-forth.
    const a = (Math.random() - 0.5) * 0.1;
    const c = Math.cos(a);
    const s = Math.sin(a);
    [ball.vx, ball.vy] = [ball.vx * c - ball.vy * s, ball.vx * s + ball.vy * c];
    return { x: nx, y: ny };
  };

  /** The viewport edges, and the sticky header's bottom edge when it is on screen, are walls. */
  const walls = () => {
    const top = headerBox && headerBox.bottom > 0 ? headerBox.bottom : 0;
    if (ball.x < radius) [ball.x, ball.vx] = [radius, Math.abs(ball.vx)];
    if (ball.x > W - radius) [ball.x, ball.vx] = [W - radius, -Math.abs(ball.vx)];
    if (ball.y < top + radius) [ball.y, ball.vy] = [top + radius, Math.abs(ball.vy)];
    if (ball.y > H - radius) [ball.y, ball.vy] = [H - radius, -Math.abs(ball.vy)];
  };

  const collide = (now: number) => {
    walls();

    const sx = window.scrollX;
    const sy = window.scrollY;
    // Up to three passes: being pushed out of one word can push the ball into its neighbour.
    for (let pass = 0; pass < 3; pass++) {
      let any = false;
      for (const o of obstacles) {
        const ox = o.x - sx;
        const oy = o.y - sy;
        if (oy > ball.y + radius || oy + o.h < ball.y - radius || ox > ball.x + radius || ox + o.w < ball.x - radius) continue;
        const n = resolveRect(ox, oy, o.w, o.h);
        if (!n) continue;
        any = true;
        if (o.word && now - o.hitAt > 150) {
          o.hitAt = now;
          nudge(o.el, -n.x, -n.y);
        }
      }
      if (!any) break;
    }
    walls(); // being pushed out of a word must never leave the ball off screen

    if (pointer.active && !grabbed) {
      const dx = ball.x - pointer.x;
      const dy = ball.y - pointer.y;
      const d = Math.hypot(dx, dy);
      const min = radius + PADDLE_RADIUS;
      if (d < min && d > 0) {
        const nx = dx / d;
        const ny = dy / d;
        ball.x = pointer.x + nx * min;
        ball.y = pointer.y + ny * min;
        const rel = (ball.vx - pointer.vx) * nx + (ball.vy - pointer.vy) * ny;
        if (rel < 0) {
          ball.vx -= 2 * rel * nx;
          ball.vy -= 2 * rel * ny;
        }
      }
    }

    const s = Math.hypot(ball.vx, ball.vy);
    if (s > MAX_SPEED) setSpeed(MAX_SPEED);
    else if (s < BASE_SPEED * 0.5) setSpeed(BASE_SPEED * 0.5);
  };

  const step = (dt: number, now: number) => {
    headerBox = header?.getBoundingClientRect() ?? null;
    // The paddle's velocity fades when the pointer stops sending events.
    const fade = Math.exp(-dt * 12);
    pointer.vx *= fade;
    pointer.vy *= fade;

    if (grabbed) {
      ball.x = pointer.x;
      ball.y = pointer.y;
      return;
    }
    // Ease the speed back towards cruising speed after a throw.
    const speed = Math.hypot(ball.vx, ball.vy);
    setSpeed(speed + (BASE_SPEED - speed) * (1 - Math.exp(-dt * 0.9)));
    // Sub-steps so a fast ball cannot skip through a line of text between frames.
    const dist = Math.hypot(ball.vx, ball.vy) * dt;
    const steps = Math.max(1, Math.ceil(dist / (radius * 0.6)));
    const sdt = dt / steps;
    for (let i = 0; i < steps; i++) {
      ball.x += ball.vx * sdt;
      ball.y += ball.vy * sdt;
      collide(now);
    }
  };

  // ---- Drawing ----
  const draw = (now: number) => {
    if (now - colorAt > 1000) {
      color = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || color;
      colorAt = now;
    }
    ctx.clearRect(0, 0, W, H);
    trail.push({ x: ball.x, y: ball.y });
    if (trail.length > TRAIL) trail.shift();
    ctx.fillStyle = color;
    for (let i = 0; i < trail.length - 1; i++) {
      const k = (i + 1) / trail.length;
      ctx.globalAlpha = k * 0.22;
      ctx.beginPath();
      ctx.arc(trail[i].x, trail[i].y, radius * (0.35 + 0.65 * k), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, radius, 0, Math.PI * 2);
    ctx.fill();
    // A soft highlight so it reads as a sphere.
    const g = ctx.createRadialGradient(ball.x - radius * 0.35, ball.y - radius * 0.4, 0, ball.x, ball.y, radius);
    g.addColorStop(0, "rgba(255,255,255,0.55)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fill();
    // The paddle: a faint ring around a mouse pointer.
    if (pointer.active && !pointer.touch && !grabbed) {
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, PADDLE_RADIUS, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    const near = pointer.active && !pointer.touch && Math.hypot(ball.x - pointer.x, ball.y - pointer.y) < radius + 10;
    const want = grabbed ? "grabbing" : near ? "grab" : "";
    if (want !== cursor) {
      cursor = want;
      document.documentElement.style.cursor = want;
    }
  };

  // ---- Loop ----
  let last = performance.now();
  let raf = 0;
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.04, (now - last) / 1000);
    last = now;
    step(dt, now);
    draw(now);
  };
  raf = requestAnimationFrame(frame);

  if (process.env.NODE_ENV !== "production") {
    // Poke at the state from the console while developing: window.__bounce.ball
    (window as unknown as { __bounce?: unknown }).__bounce = { ball, pointer, step, draw, get obstacles() { return obstacles; } };
  }

  // ---- Input ----
  const onMove = (e: PointerEvent) => {
    const dt = Math.max(1, e.timeStamp - pointer.t) / 1000;
    if (pointer.active) {
      const ivx = (e.clientX - pointer.x) / dt;
      const ivy = (e.clientY - pointer.y) / dt;
      pointer.vx = pointer.vx * 0.4 + ivx * 0.6;
      pointer.vy = pointer.vy * 0.4 + ivy * 0.6;
    }
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.t = e.timeStamp;
    pointer.touch = e.pointerType === "touch";
    pointer.active = true;
  };
  const onDown = (e: PointerEvent) => {
    onMove(e);
    pointer.vx = 0;
    pointer.vy = 0;
    if (Math.hypot(ball.x - e.clientX, ball.y - e.clientY) < radius + 10) {
      grabbed = true;
      e.preventDefault();
    }
  };
  const onUp = (e: PointerEvent) => {
    if (grabbed) {
      grabbed = false;
      suppressClick = true;
      const s = Math.hypot(pointer.vx, pointer.vy);
      if (s > 30) {
        ball.vx = pointer.vx;
        ball.vy = pointer.vy;
      }
      setSpeed(clamp(s, BASE_SPEED, MAX_SPEED));
    }
    if (e.pointerType === "touch") pointer.active = false;
  };
  const onOut = (e: PointerEvent) => {
    if (!e.relatedTarget) pointer.active = false;
  };
  const onClick = (e: MouseEvent) => {
    // A throw that ends over a link must not follow the link.
    if (suppressClick) {
      suppressClick = false;
      e.preventDefault();
      e.stopPropagation();
    }
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") onStop();
  };
  const onResize = () => {
    fit();
    scheduleScan();
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerdown", onDown);
  window.addEventListener("pointerup", onUp);
  window.addEventListener("pointercancel", onUp);
  document.addEventListener("pointerout", onOut);
  document.addEventListener("click", onClick, true);
  document.addEventListener("keydown", onKey);
  window.addEventListener("resize", onResize);
  const ro = new ResizeObserver(scheduleScan);
  ro.observe(document.body);
  document.fonts?.ready.then(scheduleScan);

  return () => {
    cancelAnimationFrame(raf);
    clearTimeout(scanTimer);
    ro.disconnect();
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerdown", onDown);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onUp);
    document.removeEventListener("pointerout", onOut);
    document.removeEventListener("click", onClick, true);
    document.removeEventListener("keydown", onKey);
    document.removeEventListener("animationend", onAnimationEnd);
    window.removeEventListener("resize", onResize);
    document.documentElement.style.cursor = "";
    restore();
  };
}
