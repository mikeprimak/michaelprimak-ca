// Generates the design-mock artboards (.dc.html) for the michaelprimak.ca rebuild.
// Run: node design/mock/build-mock.mjs   (from the repo root)
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

// ---------- tokens ----------
const LIGHT = `
  --bg:#f4f1ea; --bg2:#ebe7de; --bg3:#e2ddd2;
  --ink:#1a1815; --ink2:#4a463f; --ink3:#7d786e; --line:#d8d3c7;
  --accent:#b8491f; --accent-h:#983a16; --on-accent:#fff;
  --btn-bg:#1a1815; --btn-fg:#f4f1ea;`;
const DARK = `
  --bg:#161412; --bg2:#1f1c19; --bg3:#2a2622;
  --ink:#f0ebe2; --ink2:#bfb8ab; --ink3:#8a8377; --line:#2f2b26;
  --accent:#e8703f; --accent-h:#f28a5e; --on-accent:#161412;
  --btn-bg:#f0ebe2; --btn-fg:#161412;`;

const FONTS = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&amp;family=Geist:wght@400;500&amp;family=Geist+Mono:wght@400;500&amp;display=swap">`;

const css = (tokens) => `
:root{${tokens}}
*{box-sizing:border-box}
html,body{height:100%}
body{margin:0;background:var(--bg);color:var(--ink);font-family:Geist,system-ui,-apple-system,"Segoe UI",sans-serif;font-size:17px;line-height:1.55;-webkit-font-smoothing:antialiased}
a{color:var(--accent);text-decoration:none}
a:hover{color:var(--accent-h)}
p{margin:0}
.serif{font-family:"Instrument Serif",Georgia,"Times New Roman",serif;font-weight:400;letter-spacing:-0.012em}
.mono{font-family:"Geist Mono",ui-monospace,"SF Mono",Menlo,Consolas,monospace;font-size:12.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink3)}
.wrap{max-width:1120px;margin:0 auto;padding:0 48px}
.muted{color:var(--ink2)}
.small{font-size:15px}

/* nav */
.nav{display:flex;align-items:center;justify-content:space-between;height:76px}
.wordmark{font-family:"Instrument Serif",Georgia,serif;font-size:24px;color:var(--ink)}
.navlinks{display:flex;gap:32px;align-items:center}
.navlinks a{color:var(--ink2);font-size:15px}
.navlinks a:hover{color:var(--ink)}

/* buttons */
.btn{display:inline-flex;align-items:center;gap:10px;height:52px;padding:0 24px;border-radius:999px;background:var(--btn-bg);color:var(--btn-fg);font-weight:500;font-size:16px;white-space:nowrap}
.btn:hover{background:var(--accent);color:var(--on-accent)}
.btn.sm{height:42px;padding:0 18px;font-size:15px}
.btn svg{width:16px;height:16px;flex:none}
.textlink{display:inline-flex;align-items:center;gap:8px;color:var(--ink);font-weight:500;border-bottom:1px solid var(--line);padding-bottom:2px}
.textlink:hover{color:var(--accent);border-color:var(--accent)}
.textlink svg{width:16px;height:16px}

/* hero */
.hero{padding:88px 0 96px;display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:72px;align-items:center}
h1{font-size:66px;line-height:1.04;margin:0 0 28px}
h1 em{font-style:italic;color:var(--accent)}
.lede{font-size:19px;color:var(--ink2);max-width:560px;margin-bottom:36px}
.ctas{display:flex;gap:28px;align-items:center;flex-wrap:wrap}
.herovis{display:flex;flex-direction:column;gap:20px;align-items:flex-end}
.photo{width:264px;height:264px;border-radius:50%;object-fit:cover;object-position:50% 20%;background:var(--bg2)}
.live{width:100%;max-width:400px;background:var(--bg2);border:1px solid var(--line);border-radius:16px;padding:20px 22px;display:flex;flex-direction:column;gap:14px}
.live-head{display:flex;justify-content:space-between;align-items:center}
.dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:#2f9e5b;margin-right:8px;box-shadow:0 0 0 3px rgba(47,158,91,.18)}
.stats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.stat b{display:block;font-family:"Instrument Serif",Georgia,serif;font-weight:400;font-size:34px;line-height:1;margin-bottom:6px}
.stat span{font-size:13px;color:var(--ink3)}

/* sections */
section{padding:96px 0;border-top:1px solid var(--line)}
.eyebrow{display:flex;align-items:center;gap:14px;margin-bottom:28px}
.eyebrow i{display:block;width:28px;height:1px;background:var(--ink3)}
h2{font-size:46px;line-height:1.08;margin:0 0 20px;max-width:760px}
.intro{font-size:19px;color:var(--ink2);max-width:620px;margin-bottom:56px}
.grid3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:40px}
.grid2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:48px}
.svc{display:flex;flex-direction:column;gap:16px;padding-top:24px;border-top:1px solid var(--ink)}
.svc h3{font-size:28px;margin:0;line-height:1.15}
.svc p{color:var(--ink2)}
.svc .mono{text-transform:none;letter-spacing:.02em;font-size:13px;margin-top:auto;padding-top:8px}

/* work */
.feature{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:48px;align-items:center;background:var(--bg2);border-radius:24px;padding:48px;margin-bottom:28px}
.feature h3{font-size:40px;margin:0 0 14px;line-height:1.08}
.feature p{color:var(--ink2);margin-bottom:22px}
.tags{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:28px}
.tag{font-family:"Geist Mono",ui-monospace,monospace;font-size:12px;letter-spacing:.03em;padding:6px 10px;border:1px solid var(--line);border-radius:999px;color:var(--ink2)}
.shot{display:flex;align-items:center;justify-content:center;border:1px dashed var(--ink3);border-radius:16px;color:var(--ink3);font-family:"Geist Mono",ui-monospace,monospace;font-size:12.5px;letter-spacing:.06em;text-transform:uppercase;text-align:center;padding:16px}
.phones{display:flex;gap:16px;justify-content:center;align-items:flex-end}
.phone{width:150px;height:300px;border-radius:24px;background:var(--bg3);border:1px dashed var(--ink3);display:flex;align-items:center;justify-content:center;color:var(--ink3);font-family:"Geist Mono",ui-monospace,monospace;font-size:11px;letter-spacing:.06em;text-transform:uppercase;text-align:center;padding:12px}
.phone.tall{height:340px}
.appicon{width:56px;height:56px;border-radius:14px;margin-bottom:22px}
.workgrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px}
.work{display:flex;flex-direction:column;gap:14px}
.work .shot{height:190px}
.work h3{font-size:24px;margin:8px 0 0;line-height:1.15}
.work p{color:var(--ink2);font-size:16px}
.work .meta{font-size:13px;color:var(--ink3);display:flex;justify-content:space-between;align-items:center}

/* how I work */
.steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:40px;margin-bottom:56px}
.step{display:flex;flex-direction:column;gap:12px}
.step .num{font-family:"Instrument Serif",Georgia,serif;font-size:44px;line-height:1;color:var(--accent)}
.step h3{font-size:24px;margin:0;line-height:1.2}
.step p{color:var(--ink2)}
.callout{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:40px;align-items:center;background:var(--ink);color:var(--bg);border-radius:24px;padding:40px 48px}
.callout h3{font-size:32px;margin:0 0 10px;line-height:1.15}
.callout p{color:var(--bg);opacity:.75}
.callout .btn{background:var(--bg);color:var(--ink)}
.callout .btn:hover{background:var(--accent);color:var(--on-accent)}

/* experience */
.timeline{display:flex;flex-direction:column;border-top:1px solid var(--line)}
.row{display:grid;grid-template-columns:150px minmax(0,1fr) auto;gap:24px;align-items:baseline;padding:22px 0;border-bottom:1px solid var(--line)}
.row .when{font-family:"Geist Mono",ui-monospace,monospace;font-size:13px;color:var(--ink3)}
.row .who{font-size:20px}
.row .who small{display:block;font-size:15px;color:var(--ink2);margin-top:2px}
.pill{font-family:"Geist Mono",ui-monospace,monospace;font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;padding:5px 10px;border-radius:999px;border:1px solid var(--line);color:var(--ink2);white-space:nowrap}
.pill.lead{border-color:var(--accent);color:var(--accent)}
.row .pill{justify-self:start}
.edu{display:flex;gap:40px;margin-top:40px;flex-wrap:wrap}
.edu div{display:flex;flex-direction:column;gap:6px}

/* contact */
.form{display:flex;flex-direction:column;gap:18px}
.field{display:flex;flex-direction:column;gap:8px}
.field label{font-size:14px;color:var(--ink2)}
.input{min-height:52px;border:1px solid var(--line);border-radius:12px;background:transparent;padding:0 16px;font:inherit;color:var(--ink);display:flex;align-items:center;justify-content:space-between}
.input.area{min-height:150px;align-items:flex-start;padding-top:14px}
.input .ph{color:var(--ink3)}
.frow{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
.side{display:flex;flex-direction:column;gap:28px}
.side .links{display:flex;flex-direction:column;gap:10px}
.side .links a{color:var(--ink);border-bottom:1px solid var(--line);align-self:flex-start;padding-bottom:2px}
.side .links a:hover{color:var(--accent);border-color:var(--accent)}

/* footer */
footer{border-top:1px solid var(--line);padding:32px 0 48px;display:flex;justify-content:space-between;align-items:center;gap:24px;color:var(--ink3);font-size:14px}
footer .fl{display:flex;gap:24px}
footer a{color:var(--ink2)}

/* case study */
.crumb{display:flex;gap:10px;align-items:center;margin-top:48px}
.crumb a{color:var(--ink3)}
.cs-head{padding:24px 0 56px}
.cs-head h1{font-size:76px;margin:0 0 18px}
.deck{font-size:24px;color:var(--ink2);max-width:720px;font-family:"Instrument Serif",Georgia,serif}
.metagrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:32px;padding:32px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.meta div{display:flex;flex-direction:column;gap:8px}
.meta p{font-size:16px}
.cs-hero{margin:56px 0 0;background:var(--bg2);border-radius:24px;padding:56px;display:flex;justify-content:center}
.prose{display:grid;grid-template-columns:260px minmax(0,1fr);gap:48px;padding:72px 0;border-top:1px solid var(--line)}
.prose h2{font-size:34px;margin:0}
.prose .body{display:flex;flex-direction:column;gap:18px;max-width:640px}
.prose .body p{color:var(--ink2);font-size:18px}
.prose ul{margin:0;padding-left:20px;color:var(--ink2);font-size:18px;display:flex;flex-direction:column;gap:10px}
.arch{width:100%;max-width:760px;height:auto;display:block}
.hard{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:32px}
.hard div{display:flex;flex-direction:column;gap:10px;padding-top:20px;border-top:1px solid var(--ink)}
.hard h4{margin:0;font-size:21px;line-height:1.2}
.hard p{color:var(--ink2);font-size:16px}
.outcome{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:32px;margin-bottom:8px}
.outcome b{display:block;font-family:"Instrument Serif",Georgia,serif;font-weight:400;font-size:52px;line-height:1;margin-bottom:8px}
.outcome span{font-size:14px;color:var(--ink3)}
.nextcta{display:flex;justify-content:space-between;align-items:center;gap:32px;padding:56px 0;border-top:1px solid var(--line)}
.nextcta h3{font-size:36px;margin:0}

@media (max-width:720px){
  .wrap{padding:0 20px}
  .nav{height:64px}
  .navlinks a{display:none}
  .hero{grid-template-columns:minmax(0,1fr);gap:40px;padding:40px 0 64px}
  h1{font-size:42px}
  .lede{font-size:17px}
  .herovis{align-items:flex-start}
  .photo{width:160px;height:160px}
  section{padding:64px 0}
  h2{font-size:34px}
  .intro{font-size:17px;margin-bottom:36px}
  .grid3,.grid2,.workgrid,.steps,.frow,.hard,.outcome,.metagrid{grid-template-columns:minmax(0,1fr)}
  .feature{grid-template-columns:minmax(0,1fr);padding:28px;gap:28px}
  .feature h3{font-size:32px}
  .phones{gap:10px}
  .phone{width:96px;height:200px}
  .phone.tall{height:220px}
  .callout{grid-template-columns:minmax(0,1fr);padding:28px}
  .row{grid-template-columns:minmax(0,1fr);gap:8px}
  .cs-head h1{font-size:48px}
  .deck{font-size:20px}
  .prose{grid-template-columns:minmax(0,1fr);gap:20px;padding:48px 0}
  .cs-hero{padding:28px}
  footer{flex-direction:column;align-items:flex-start}
}
`;

// ---------- shared fragments ----------
const arrow = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"></path></svg>`;

const nav = `
<header class="wrap">
  <div class="nav">
    <a class="wordmark" href="#">Mike Primak</a>
    <div class="navlinks">
      <a href="#work">Work</a><a href="#services">Services</a><a href="#how">How I work</a><a href="#experience">Experience</a><a href="#contact">Contact</a>
      <a class="btn sm" href="#contact">Start a project</a>
    </div>
  </div>
</header>`;

const footer = `
<div class="wrap">
  <footer>
    <div>© 2026 Mike Primak · Ontario, Canada</div>
    <div class="fl"><a href="#">GitHub</a><a href="#">LinkedIn</a><a href="#">How this site was built</a></div>
  </footer>
</div>`;

const home = `
${nav}
<main>
  <div class="wrap">
    <div class="hero">
      <div>
        <div class="eyebrow"><span class="mono">Freelance developer · Web &amp; mobile</span></div>
        <h1 class="serif">I build and launch websites and mobile apps for small and mid-sized businesses.</h1>
        <p class="lede">Senior developer, hands-on with both the code and the AI tools that make it faster. I've shipped commercial sites and iOS/Android apps, and led dev teams that had to work with designers and customer-facing staff — so I know how to get from idea to launched.</p>
        <div class="ctas">
          <a class="btn" href="#contact">Start a project ${arrow}</a>
          <a class="textlink" href="#contact">Open to contracts and roles ${arrow}</a>
        </div>
      </div>
      <div class="herovis">
        <img class="photo" src="mike.jpg" alt="Mike Primak">
        <div class="live">
          <div class="live-head"><span class="mono"><span class="dot"></span>Live from production</span><span class="mono">Good Fights API</span></div>
          <div class="stats">
            <div class="stat"><b class="serif">1,284</b><span>fights rated this week</span></div>
            <div class="stat"><b class="serif">12,910</b><span>fights in the catalogue</span></div>
          </div>
          <p class="small muted">Real numbers from an app I built and run. Updated 4 min ago.</p>
        </div>
      </div>
    </div>
  </div>

  <section id="services">
    <div class="wrap">
      <div class="eyebrow"><span class="mono">01</span><i></i><span class="mono">Services</span></div>
      <h2 class="serif">Three ways I can help.</h2>
      <p class="intro">Most clients need one of these. Some need all three at once — that's fine too.</p>
      <div class="grid3">
        <div class="svc">
          <h3 class="serif">Websites &amp; web apps</h3>
          <p>Marketing sites, booking, dashboards, and the back-end behind them. Built to load fast, rank on Google, and be easy to update after I'm gone.</p>
          <span class="mono">Next.js · React · TypeScript · WordPress · Node · PostgreSQL</span>
        </div>
        <div class="svc">
          <h3 class="serif">iOS &amp; Android apps</h3>
          <p>One codebase, both stores. From the first build through App Store and Play Store review, updates, and the API the app talks to.</p>
          <span class="mono">React Native · Expo · REST APIs · App Store &amp; Play Store</span>
        </div>
        <div class="svc">
          <h3 class="serif">Technical leadership</h3>
          <p>A fractional lead for teams that need a senior hand: scoping, hiring, code review, and keeping developers, designers and customer teams pulling in one direction.</p>
          <span class="mono">Fractional lead · Team management · Code review · Planning</span>
        </div>
      </div>
    </div>
  </section>

  <section id="work">
    <div class="wrap">
      <div class="eyebrow"><span class="mono">02</span><i></i><span class="mono">Selected work</span></div>
      <h2 class="serif">Things I've shipped.</h2>
      <p class="intro">Real products, live today. Each one has a short write-up of what was built, what was hard, and what happened after launch.</p>
      <div class="feature">
        <div>
          <img class="appicon" src="goodfights-icon.png" alt="Good Fights app icon">
          <h3 class="serif">Good Fights</h3>
          <p>A fight-rating app for combat-sports fans — live on the App Store and Google Play, with a fight catalogue going back to 1994 that daily scrapers keep current.</p>
          <div class="tags"><span class="tag">React Native</span><span class="tag">Node · TypeScript</span><span class="tag">PostgreSQL</span><span class="tag">iOS + Android</span><span class="tag">Next.js</span></div>
          <a class="textlink" href="#">Read the case study ${arrow}</a>
        </div>
        <div class="phones">
          <div class="phone">[ app screenshot ]</div>
          <div class="phone tall">[ app screenshot ]</div>
          <div class="phone">[ app screenshot ]</div>
        </div>
      </div>
      <div class="workgrid">
        <div class="work">
          <div class="shot">[ screenshot — avoidjawsurgery.com ]</div>
          <h3 class="serif">avoidjawsurgery.com</h3>
          <p>A WordPress site rebuilt as fast, dependency-free static HTML — every page migrated word-for-word, redesigned, and ready to host anywhere.</p>
          <div class="meta"><span>Static rebuild · AI-assisted</span><a class="textlink small" href="#">Case study ${arrow}</a></div>
        </div>
        <div class="work">
          <div class="shot">[ screenshot — Meaford Osteopathy ]</div>
          <h3 class="serif">Meaford Osteopathy</h3>
          <p>Business website for a local health clinic, with an integrated booking system — the kind of site most small businesses actually need.</p>
          <div class="meta"><span>Business site · Booking</span><a class="textlink small" href="#">Case study ${arrow}</a></div>
        </div>
        <div class="work">
          <div class="shot">[ screenshot — LGBT Voice Tanzania ]</div>
          <h3 class="serif">LGBT Voice Tanzania</h3>
          <p>Website for an LGBT+ advocacy organization, built on WordPress so the team can publish and manage it themselves.</p>
          <div class="meta"><span>WordPress · Non-profit</span><a class="textlink small" href="#">Case study ${arrow}</a></div>
        </div>
      </div>
    </div>
  </section>

  <section id="how">
    <div class="wrap">
      <div class="eyebrow"><span class="mono">03</span><i></i><span class="mono">How I work</span></div>
      <h2 class="serif">Manual and AI-assisted. Senior quality, faster.</h2>
      <p class="intro">I write code by hand and I use AI tools well. The result is the pace of a small team with one experienced person accountable for every line.</p>
      <div class="steps">
        <div class="step"><span class="num">1</span><h3>A short call, then a written scope</h3><p>We talk through what you need and who it's for. You get a plain-language scope with a fixed price or a clear estimate — no surprises later.</p></div>
        <div class="step"><span class="num">2</span><h3>Build in the open</h3><p>You get a preview link from the first week and see it improve as we go. Feedback goes straight into the next version.</p></div>
        <div class="step"><span class="num">3</span><h3>Launch, then hand you the keys</h3><p>I take it live, make sure it's fast and found by Google, and leave you able to update it — or keep me on for changes.</p></div>
      </div>
      <div class="callout">
        <div>
          <h3 class="serif">This site is a working example.</h3>
          <p>Designed and coded with Claude Code, with me reviewing every decision. Fully static, accessible, and scores 100 on Lighthouse. See what that looks like in practice.</p>
        </div>
        <a class="btn" href="#">How this site was built ${arrow}</a>
      </div>
    </div>
  </section>

  <section id="experience">
    <div class="wrap">
      <div class="eyebrow"><span class="mono">04</span><i></i><span class="mono">Experience</span></div>
      <h2 class="serif">Coder and manager, at small and mid-sized organizations.</h2>
      <p class="intro">I've written the code and I've run the team — which is why I'm comfortable being handed either.</p>
      <div class="timeline">
        <div class="row"><span class="when">[YEARS]</span><span class="who">[Organization]<small>[Role — one line on what you did]</small></span><span class="pill lead">Manager</span></div>
        <div class="row"><span class="when">[YEARS]</span><span class="who">[Organization]<small>[Role — one line on what you did]</small></span><span class="pill">Developer</span></div>
        <div class="row"><span class="when">[YEARS]</span><span class="who">[Organization]<small>[Role — one line on what you did]</small></span><span class="pill">Developer</span></div>
        <div class="row"><span class="when">[YEAR] – now</span><span class="who">Independent<small>Freelance web &amp; mobile development; founder of Good Fights</small></span><span class="pill">Developer</span></div>
      </div>
      <div class="edu">
        <div><span class="mono">Education</span><span>BA Human Kinetics · College Diploma, Data Analytics · College Diploma, Osteopathy</span></div>
        <div><span class="mono">Résumé</span><a class="textlink" href="#">Download PDF ${arrow}</a></div>
      </div>
    </div>
  </section>

  <section id="contact">
    <div class="wrap">
      <div class="eyebrow"><span class="mono">05</span><i></i><span class="mono">Contact</span></div>
      <div class="grid2">
        <div class="side">
          <div>
            <h2 class="serif">Start a project.</h2>
            <p class="intro" style="margin-bottom:0">Tell me a little about what you need. I reply within [one business day].</p>
          </div>
          <div class="links">
            <span class="mono">Or reach me directly</span>
            <a href="mailto:michaelsprimak@gmail.com">michaelsprimak@gmail.com</a>
            <a href="#">LinkedIn</a>
            <a href="#">GitHub</a>
          </div>
          <p class="small muted">Hiring for a contract or an in-house role? Mention it in the form and I'll send a résumé.</p>
        </div>
        <div class="form">
          <div class="frow">
            <div class="field"><label>Name</label><div class="input"><span class="ph">Your name</span></div></div>
            <div class="field"><label>Email</label><div class="input"><span class="ph">you@company.com</span></div></div>
          </div>
          <div class="field"><label>What are you building?</label><div class="input"><span>Website · Mobile app · Both · Team lead · Not sure yet</span><span class="ph">▾</span></div></div>
          <div class="field"><label>Message</label><div class="input area"><span class="ph">What it is, who it's for, and any timeline or budget you have in mind.</span></div></div>
          <div><a class="btn" href="#">Send message ${arrow}</a></div>
        </div>
      </div>
    </div>
  </section>
</main>
${footer}`;

const archSvg = `
<svg class="arch" viewBox="0 0 760 300" fill="none" font-family="Geist Mono, ui-monospace, monospace" font-size="11" aria-label="Architecture diagram">
  <g stroke="var(--ink)" stroke-width="1.2">
    <rect x="10" y="20" width="200" height="72" rx="10"></rect>
    <rect x="10" y="120" width="200" height="72" rx="10"></rect>
    <rect x="280" y="70" width="200" height="72" rx="10"></rect>
    <rect x="550" y="70" width="200" height="72" rx="10"></rect>
    <rect x="280" y="208" width="200" height="72" rx="10" stroke-dasharray="4 4"></rect>
  </g>
  <g fill="var(--ink)">
    <text x="110" y="50" text-anchor="middle" font-size="14" font-family="Geist, system-ui, sans-serif">Mobile app</text>
    <text x="110" y="72" text-anchor="middle" fill="var(--ink3)">React Native · Expo</text>
    <text x="110" y="150" text-anchor="middle" font-size="14" font-family="Geist, system-ui, sans-serif">Web</text>
    <text x="110" y="172" text-anchor="middle" fill="var(--ink3)">Next.js · goodfights.app</text>
    <text x="380" y="100" text-anchor="middle" font-size="14" font-family="Geist, system-ui, sans-serif">REST API</text>
    <text x="380" y="122" text-anchor="middle" fill="var(--ink3)">Node · Express · TS</text>
    <text x="650" y="100" text-anchor="middle" font-size="14" font-family="Geist, system-ui, sans-serif">Database</text>
    <text x="650" y="122" text-anchor="middle" fill="var(--ink3)">PostgreSQL · Prisma</text>
    <text x="380" y="238" text-anchor="middle" font-size="14" font-family="Geist, system-ui, sans-serif">Daily scrapers</text>
    <text x="380" y="260" text-anchor="middle" fill="var(--ink3)">VPS cron · results &amp; stats</text>
  </g>
  <g stroke="var(--ink3)" stroke-width="1.2" marker-end="url(#ah)">
    <path d="M210 56 C 245 56, 245 106, 280 106"></path>
    <path d="M210 156 C 245 156, 245 106, 280 106"></path>
    <path d="M480 106 L 550 106"></path>
    <path d="M480 244 C 515 244, 515 142, 550 142"></path>
  </g>
  <defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--ink3)"></path></marker></defs>
</svg>`;

const caseStudy = `
${nav}
<main>
  <div class="wrap">
    <div class="crumb"><a href="#">Work</a><span class="mono">/</span><span class="mono" style="color:var(--ink)">Good Fights</span></div>
    <div class="cs-head">
      <h1 class="serif">Good Fights</h1>
      <p class="deck">A fight-rating app for combat-sports fans — live on the App Store and Google Play, with a catalogue going back to 1994.</p>
    </div>
    <div class="metagrid">
      <div class="meta"><span class="mono">Role</span><p>Founder · sole developer</p></div>
      <div class="meta"><span class="mono">Platforms</span><p>iOS · Android · Web</p></div>
      <div class="meta"><span class="mono">Stack</span><p>React Native (Expo), Node/Express in TypeScript, PostgreSQL + Prisma, Next.js</p></div>
      <div class="meta"><span class="mono">Links</span><p><a href="#">goodfights.app</a> · <a href="#">App Store</a> · <a href="#">Google Play</a></p></div>
    </div>
    <div class="cs-hero">
      <div class="phones">
        <div class="phone tall">[ app screenshot ]</div>
        <div class="phone tall">[ app screenshot ]</div>
        <div class="phone tall">[ app screenshot ]</div>
      </div>
    </div>

    <div class="prose">
      <h2 class="serif">The problem</h2>
      <div class="body">
        <p>Film fans have Rotten Tomatoes. Fight fans had nothing — no place to rate an individual fight, see what the crowd thought, or find the great ones they missed.</p>
        <p>Fighting Tomatoes, my earlier web version, proved people wanted this. Good Fights is the mobile-first successor, built to live on both app stores with a real back-end behind it.</p>
      </div>
    </div>

    <div class="prose">
      <h2 class="serif">What shipped</h2>
      <div class="body">
        <ul>
          <li>iOS and Android apps from one React Native codebase, published through App Store and Play Store review.</li>
          <li>Accounts with email and Google sign-in; ratings tied to a user's history.</li>
          <li>A fight catalogue back to 1994 — fighters, results, stats — kept current by daily scrapers.</li>
          <li>A REST API in TypeScript on PostgreSQL, shared by the apps and the Next.js web version at goodfights.app.</li>
          <li>Over-the-air updates so fixes reach users without a new store submission.</li>
        </ul>
      </div>
    </div>

    <div class="prose">
      <h2 class="serif">How it fits together</h2>
      <div class="body">${archSvg}</div>
    </div>

    <div class="prose">
      <h2 class="serif">The hard parts</h2>
      <div class="body" style="max-width:none">
        <div class="hard">
          <div><h4>Two app stores, one release</h4><p>Getting through Apple and Google review on every version, and keeping a release cadence that doesn't leave users stranded on an old build.</p></div>
          <div><h4>Updating without resubmitting</h4><p>Over-the-air updates have rules about which builds they can target. Getting that right meant fewer store submissions and faster fixes.</p></div>
          <div><h4>Production on a small budget</h4><p>A lean Postgres instance, scheduled jobs moved off paid CI onto a small server, and enough monitoring to know when something breaks.</p></div>
        </div>
      </div>
    </div>

    <div class="prose">
      <h2 class="serif">Outcome</h2>
      <div class="body" style="max-width:none">
        <div class="outcome">
          <div><b class="serif">[N]</b><span>installs across both stores</span></div>
          <div><b class="serif">[N]</b><span>fights rated by users</span></div>
          <div><b class="serif">[N.N]★</b><span>average store rating</span></div>
        </div>
      </div>
    </div>

    <div class="nextcta">
      <h3 class="serif">Have an app in mind?</h3>
      <a class="btn" href="#">Start a project ${arrow}</a>
    </div>
  </div>
</main>
${footer}`;

// Alternate direction: cool / grotesque stance (hero + services only)
const ALT_TOKENS = `
  --bg:#f7f8fa; --bg2:#eceef2; --bg3:#dfe3ea;
  --ink:#0f1419; --ink2:#414a55; --ink3:#727c88; --line:#d5dae2;
  --accent:#2f5fd6; --accent-h:#234bb0; --on-accent:#fff;
  --btn-bg:#0f1419; --btn-fg:#f7f8fa;`;
const ALT_FONTS = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&amp;family=Geist:wght@400;500&amp;family=Geist+Mono:wght@400;500&amp;display=swap">`;
const altCss = `
.serif,.wordmark,.stat b,.step .num{font-family:"Space Grotesk",system-ui,sans-serif !important;font-weight:500;letter-spacing:-0.03em}
h1{font-size:60px;font-weight:600}
h1 em{font-style:normal;color:var(--accent)}
.btn{border-radius:8px}
.live{border-radius:8px}
.photo{border-radius:16px}
.svc{border-top:2px solid var(--accent)}
`;

const altHero = `
${nav}
<main>
  <div class="wrap">
    <div class="hero">
      <div>
        <div class="eyebrow"><span class="mono">Freelance developer · Web &amp; mobile</span></div>
        <h1 class="serif">I build and launch websites and mobile apps for small and mid-sized businesses.</h1>
        <p class="lede">Senior developer, hands-on with both the code and the AI tools that make it faster. I've shipped commercial sites and iOS/Android apps, and led dev teams that had to work with designers and customer-facing staff.</p>
        <div class="ctas">
          <a class="btn" href="#contact">Start a project ${arrow}</a>
          <a class="textlink" href="#contact">Open to contracts and roles ${arrow}</a>
        </div>
      </div>
      <div class="herovis">
        <img class="photo" src="mike.jpg" alt="Mike Primak">
        <div class="live">
          <div class="live-head"><span class="mono"><span class="dot"></span>Live from production</span><span class="mono">Good Fights API</span></div>
          <div class="stats">
            <div class="stat"><b class="serif">1,284</b><span>fights rated this week</span></div>
            <div class="stat"><b class="serif">12,910</b><span>fights in the catalogue</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section id="services">
    <div class="wrap">
      <div class="eyebrow"><span class="mono">01</span><i></i><span class="mono">Services</span></div>
      <h2 class="serif">Three ways I can help.</h2>
      <div class="grid3" style="margin-top:48px">
        <div class="svc"><h3 class="serif">Websites &amp; web apps</h3><p>Marketing sites, booking, dashboards, and the back-end behind them. Built to load fast, rank on Google, and be easy to update.</p><span class="mono">Next.js · React · TypeScript · WordPress · Node</span></div>
        <div class="svc"><h3 class="serif">iOS &amp; Android apps</h3><p>One codebase, both stores. From the first build through review, updates, and the API the app talks to.</p><span class="mono">React Native · Expo · REST APIs</span></div>
        <div class="svc"><h3 class="serif">Technical leadership</h3><p>A fractional lead for teams that need a senior hand: scoping, hiring, code review, and alignment across teams.</p><span class="mono">Fractional lead · Team management</span></div>
      </div>
    </div>
  </section>
</main>`;

// ---------- emit ----------
const page = (title, tokens, fonts, body, extraCss = "") => `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  <title>${title}</title>
  ${fonts}
  <style>${css(tokens)}${extraCss}</style>
</helmet>
<div style="min-height:100%;background:var(--bg)">
${body}
</div>
</x-dc>
</body>
</html>
`;

const out = (name, html) => { writeFileSync(join(here, name), html); console.log("wrote", name, html.length); };

out("Main.dc.html", page("Home — light", LIGHT, FONTS, home));
out("HomeDark.dc.html", page("Home — dark", DARK, FONTS, home));
out("Mobile.dc.html", page("Home — phone", LIGHT, FONTS, home));
out("CaseStudy.dc.html", page("Case study — Good Fights", LIGHT, FONTS, caseStudy));
out("AltCool.dc.html", page("Alternate — cool / grotesque", ALT_TOKENS, ALT_FONTS, altHero, altCss));

const canvas = {
  artboards: [
    { file: "Main.dc.html", title: "Home — light", x: 0, y: 0, w: 1440, h: 5640 },
    { file: "HomeDark.dc.html", title: "Home — dark", x: 1560, y: 0, w: 1440, h: 5640 },
    { file: "Mobile.dc.html", title: "Home — phone (390)", x: 3120, y: 0, w: 390, h: 8800 },
    { file: "CaseStudy.dc.html", title: "Case study — Good Fights", x: 0, y: 5840, w: 1440, h: 3240 },
    { file: "AltCool.dc.html", title: "Alternate stance — cool / grotesque (for comparison only)", x: 1560, y: 5840, w: 1440, h: 1520 },
  ],
  annotations: [
    { id: "readme", x: 3640, y: 0, w: 360, text: "michaelprimak.ca — design mock, 2026-08-27\n\nRecommended direction: warm paper, serif display + mono labels, one burnt-orange accent. Same page in light, dark and phone width.\n\nDashed boxes = screenshots to add. [Brackets] = facts to fill in (employers, years, stats). Numbers in the 'Live from production' card are sample values — the real site pulls them from the Good Fights API.\n\nThe 'Alternate stance' artboard (bottom right) is a hero-only sketch of a cooler, grotesque-type version, in case the warm serif look feels too soft." },
  ],
  launch: { view: "focused", file: "Main.dc.html" },
};
writeFileSync(join(here, "canvas.json"), JSON.stringify(canvas, null, 2));
console.log("wrote canvas.json");
