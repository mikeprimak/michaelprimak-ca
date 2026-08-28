# michaelprimak.ca rebuild — handoff brief

Status as of 2026-08-27: PLANNING. No site code written yet. Mike answered the open
questions (see "Answers" below); next step is agreeing on design direction, then a
design mock, then build.

## The ask (from Mike)
- Existing site: https://michaelprimak.ca — hand-coded React SPA (client-rendered; the
  server HTML is an empty shell titled "Web Developer | Michael Primak" / "Frontend
  Developer | Mike Primak", so SEO/link previews currently see nothing).
- Rebuild it via vibe coding with Claude Code as a SEPARATE offsite dev project (this
  folder, C:\Users\avoca\mpnew, currently empty), then swap it in for the live site when ready.
- Mike prefers vibe coding and finds it easier; the new site should be easy to keep
  editing that way.
- Mike asked to be given a plan and clarifying questions BEFORE anything is built.

## Positioning to communicate
- Experienced manual AND AI-assisted coder.
- Has built and launched commercial websites and mobile apps (iOS + Android).
- Has worked for small and medium-sized organizations as a coder and as a manager
  (integrating coding teams with design teams and customer-facing teams).
- PRIMARY AUDIENCE: freelance clients. SECONDARY: would also entertain contracts or
  positions at organizations. (Confirmed by Mike.)

## Proposed plan (presented to Mike; not yet fully confirmed)
Stack defaults: Next.js (App Router) + TypeScript + Tailwind + shadcn/ui, statically
generated, GitHub repo -> Vercel (preview URL per push). Content in typed data files
(content/*.ts) so future edits are "change text / add a project", not component surgery.
Extras: metadata/OpenGraph, resume PDF download, dark/light theme, Lighthouse-clean
performance + accessibility.

Site structure (one page with anchored sections + per-project case-study pages):
1. Hero — outcome-focused for clients, e.g. "I build and launch websites and mobile
   apps for small and mid-sized businesses — fast, with a senior hand on both the code
   and the AI tools." Primary CTA "Start a project"; secondary "Open to contracts and roles."
2. Services — Web apps & sites; iOS/Android apps; Technical leadership / fractional lead
   (managing dev teams, integrating with design + customer-facing teams).
3. Selected work — case studies framed around client outcomes (what shipped, for whom,
   result), live / App Store / Play Store links, screenshots.
4. How I work — manual + AI-assisted process; faster delivery at senior quality; the site
   itself being vibe-coded is a proof point.
5. Experience — compact timeline of orgs, coder vs manager roles distinguished (serves
   the recruiter/employer audience).
6. Contact — "Start a project" + email/LinkedIn/GitHub; note about being open to
   contract or in-house positions.

Workflow: build here -> GitHub -> Vercel preview -> iterate with Mike -> when approved,
point michaelprimak.ca at the new project and retire the old one.

## Answers from Mike (2026-08-27)
1. Content: the live site is deployed on Vercel from a LOCAL folder,
   C:\Users\avoca\michaelprimak-ca (CRA production build, deployed via `vercel` CLI,
   project prj_0Ar49duyGMiszDf579YT2KM9c5En, team team_Bn7tGQctGzWXvu1WTA4kIUjv,
   aliases michaelprimak-ca.vercel.app). No git repo. Original React source was
   recovered from the shipped source map and saved to reference/old-site-src/ in this
   repo. Images are in C:\Users\avoca\michaelprimak-ca\assets. Mike is willing to set
   up a GitHub repo (he already uses GitHub).
2. Hosting: Vercel already (DNS for michaelprimak.ca presumably on Vercel too — verify
   at cutover).
3. Contact: real form (Resend or similar + spam protection). Old site email:
   michaelsprimak@gmail.com.
4. Design: Mike wants the site to (a) demonstrate communicating critical info clearly
   and (b) demonstrate the ability to code a great website. His leaning is simple
   (current site is very simple) but he may want to show he can handle complexity.
   DECIDED (2026-08-27): "simple surface, deep underneath" — editorial-minimal design
   (strong type, whitespace, one accent colour, dark/light), depth in case-study pages
   (problem / shipped / architecture / hard parts / outcome), one signature live element
   (real data from the Good Fights API), plus a "How this site was built" page. Avoid:
   3D/particles, logo marquee, skill bars, long about prose.
5. Featured projects (decided): Good Fights (lead), avoidjawsurgery.com, Meaford
   Osteopathy, LGBT Voice Tanzania. Drop Contact Manager; cannabis scraper only as a
   minor "smaller work" item if at all.
6. GitHub: Mike will create the repo and notify Claude. Contact form leads go to
   michaelsprimak@gmail.com.
7. Design mock DONE 2026-08-27, awaiting Mike's feedback:
   https://claude.ai/code/artifact/1c34caec-1b8f-47cf-8ba3-785d3d8054e2
   Working files: design/mock/ (build-mock.mjs generates the .dc.html artboards; edit
   the script, run `node design/mock/build-mock.mjs`, re-seed with the design skill's
   helper, republish to the same URL). Artboards: Main (home, light), HomeDark, Mobile
   (390px), CaseStudy (Good Fights), AltCool (cool/grotesque alternate, hero only).
   Fonts: Instrument Serif (display) + Geist (body) + Geist Mono (labels). Light palette
   warm paper #f4f1ea / ink #1a1815 / accent #b8491f; dark #161412 / #f0ebe2 / #e8703f.
   Placeholders still needed from Mike: employer names/roles/years, app screenshots,
   Good Fights outcome stats, résumé PDF, LinkedIn URL confirmation.
8. Next step: Mike reviews the mock -> revisions -> then build the Next.js site.

## Content inventory of the current site (from recovered source)
- Hero: "Hello, I'm Mike Primak — Web Developer — Front-end, Back-end, Wordpress, Data
  Analytics"; tech-logo marquee; Download CV; LinkedIn linkedin.com/in/michael-primak;
  GitHub github.com/mikeprimak.
- About: 6+ yrs web dev; education: College Diploma Data Analytics, College Diploma
  Osteopathy, BA Human Kinetics; generic "talented web developer" copy; mentions dev +
  coordinator roles (code + managing a team).
- Projects (old): LGBT Voice Tanzania (WordPress, lgbtvoicetz.org); Ontario Cannabis
  web scraper + dashboard (Python, github.com/mikeprimak/Cann-Dash); Fighting Tomatoes
  (fightingtomatoes.com, JS/PHP/SQL); Contact Manager (small React demo); Meaford
  Osteopathy (client clinic site, demo at /projects/MeafordOsteopathy).
- NOT on the old site but exists locally and is the strongest material:
  * Good Fights (goodfights.app) — React Native/Expo iOS + Android app (live on App Store
    and Play Store, v2.1.5 in review 2026-08-26), Node/Express/TypeScript + PostgreSQL/
    Prisma backend, Next.js web, VPS cron scrapers. Folder: C:\Users\avoca\fight-mobile-app.
    Successor to Fighting Tomatoes. Flagship case study candidate.
  * avoidjawsurgery.com — WordPress site rebuilt as static HTML via Claude Code
    (2026-04-17). Folder: C:\Users\avoca\avoidjawsurgery-static. AI-assisted proof point.

## RESOLVED QUESTIONS (kept for history)
1. Content source: is there a source folder / GitHub repo for the current site to pull
   projects, text, and images from? Where? Otherwise: paste a resume/project list, or
   start with placeholders.
2. Stack/hosting: OK with Next.js + Tailwind on Vercel? Where is michaelprimak.ca hosted
   now and who manages DNS (needed to plan the cutover)?
3. Contact: plain email/LinkedIn links, or a real contact form (needs an email-sending
   integration, e.g. Resend via Vercel Marketplace, plus spam protection)? Recommendation:
   a form, since it converts better for freelance leads.
4. Design: fresh clean/modern (default), evolve the current look, or bolder? Plan is to
   propose a design mock for approval before coding either way.

## Environment notes
- Windows 11, PowerShell primary; git repo already initialized in this folder (branch
  master, clean, no commits). Git user: mikeprimak. Email: avocadomike@hotmail.com.
- Vercel CLI not installed (`npm i -g vercel` if deploying from CLI); Vercel plugin/MCP
  is available in Claude Code.
