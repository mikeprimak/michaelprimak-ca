"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

/**
 * "Listen" button that reads a section of the page aloud with the browser's
 * built-in speech synthesis (the Web Speech API). No network, no API key, works
 * offline; the voice quality is whatever the visitor's OS ships — Edge and
 * Chrome on Windows and Safari on iOS all have natural-sounding voices now.
 *
 * Anything marked `data-no-read` inside the target (forms, buttons, this
 * button) is skipped. Only one button plays at a time.
 */

const START_EVENT = "listen:start";

type State = "idle" | "playing";

function textOf(el: HTMLElement): string {
  const clone = el.cloneNode(true) as HTMLElement;
  clone.querySelectorAll("[data-no-read], script, style, svg").forEach((n) => n.remove());
  // Read screen-reader-only text too (image descriptions), but keep it brief.
  clone.querySelectorAll("img[alt]").forEach((img) => {
    const alt = img.getAttribute("alt")?.trim();
    if (alt) img.replaceWith(document.createTextNode(` ${alt}. `));
  });
  // innerText needs the node in the document to respect display: none.
  clone.style.position = "absolute";
  clone.style.left = "-9999px";
  clone.setAttribute("aria-hidden", "true");
  document.body.appendChild(clone);
  const text = clone.innerText;
  clone.remove();
  return text
    .replace(/[ \t]+/g, " ")
    .replace(/\s*\n+\s*/g, ". ")
    .replace(/\.\s*\./g, ".")
    .replace(/\s+/g, " ")
    .trim();
}

/** Chrome silently stops long utterances; queue sentence-sized chunks instead. */
function chunk(text: string, max = 220): string[] {
  const out: string[] = [];
  let cur = "";
  for (const s of text.split(/(?<=[.!?])\s+/)) {
    if ((cur + " " + s).length > max && cur) {
      out.push(cur.trim());
      cur = s;
    } else {
      cur = cur ? `${cur} ${s}` : s;
    }
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

function pickVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("en"));
  const score = (v: SpeechSynthesisVoice) =>
    (/natural|neural|premium|enhanced/i.test(v.name) ? 8 : 0) +
    (/google/i.test(v.name) ? 4 : 0) +
    (/samantha|daniel|karen|aria|jenny|guy/i.test(v.name) ? 2 : 0) +
    (/en-ca/i.test(v.lang) ? 2 : /en-us|en-gb/i.test(v.lang) ? 1 : 0) +
    (v.localService ? 0 : 1);
  return voices.sort((a, b) => score(b) - score(a))[0];
}

const noop = () => () => {};
const isSupported = () => "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";

export function ListenButton({
  targetId,
  label = "Listen",
  className = "",
}: {
  /** id of the element whose text is read. */
  targetId: string;
  label?: string;
  className?: string;
}) {
  const [state, setState] = useState<State>("idle");
  // Rendered on the server as if supported, then hidden after hydration if not.
  const supported = useSyncExternalStore(noop, isSupported, () => true);

  useEffect(() => {
    if (!supported) return;
    // Some browsers only populate the voice list after this fires.
    window.speechSynthesis.getVoices();
    const onOther = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== targetId) setState("idle");
    };
    window.addEventListener(START_EVENT, onOther);
    return () => {
      window.removeEventListener(START_EVENT, onOther);
    };
  }, [targetId, supported]);

  // Stop talking if the visitor navigates away from this page.
  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  const toggle = () => {
    const synth = window.speechSynthesis;
    if (state === "playing") {
      synth.cancel();
      setState("idle");
      return;
    }
    const el = document.getElementById(targetId);
    if (!el) return;
    const parts = chunk(textOf(el));
    if (parts.length === 0) return;

    synth.cancel();
    window.dispatchEvent(new CustomEvent(START_EVENT, { detail: targetId }));
    const voice = pickVoice();
    parts.forEach((p, i) => {
      const u = new SpeechSynthesisUtterance(p);
      if (voice) u.voice = voice;
      u.lang = voice?.lang ?? "en-CA";
      u.rate = 1;
      if (i === parts.length - 1) u.onend = () => setState("idle");
      u.onerror = () => setState("idle");
      synth.speak(u);
    });
    setState("playing");
  };

  if (!supported) return null;
  const playing = state === "playing";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      data-no-read
      className={`inline-flex h-9 items-center gap-2 rounded-full border border-line px-3.5 font-mono text-[12px] tracking-[0.06em] text-ink2 uppercase transition-colors hover:border-ink hover:text-ink ${
        playing ? "border-accent text-accent hover:border-accent hover:text-accent" : ""
      } ${className}`}
    >
      {playing ? (
        <svg viewBox="0 0 16 16" fill="currentColor" className="size-3.5" aria-hidden="true">
          <rect x="3" y="3" width="10" height="10" rx="1.5" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
          <path d="M2.5 6v4h2.5L9 13V3L5 6H2.5z" />
          <path d="M11 5.5a3.5 3.5 0 0 1 0 5M12.8 3.5a6 6 0 0 1 0 9" />
        </svg>
      )}
      {playing ? "Stop" : label}
    </button>
  );
}
