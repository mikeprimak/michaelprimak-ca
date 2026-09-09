# michaelprimak.ca — handoff

**Status 2026-09-09 (end of day): LIVE and complete.** The site serves michaelprimak.ca,
the contact form delivers email (tested), every Good Fights number on the site is live
from the production API, and Mike's full edit list from 2026-09-09 is in (see "Changes on
2026-09-09" below). Nothing is blocking. The site is no longer a reason not to apply.

---

# Contact form (done 2026-09-09)

**Working.** Test message delivered to michaelsprimak@gmail.com on 2026-09-09. The
`RESEND_API_KEY` on Vercel had been added with an **empty value** the day before (the
paste at the CLI prompt did not take), and the code's `if (!apiKey)` check treats an
empty string as missing, so the form silently used the fallback message. Re-added as a
*sensitive* variable (Vercel never shows it again) and redeployed. If it ever breaks:
`npx vercel env ls production` shows whether the variable exists but not whether it is
empty; pull it with `npx vercel env pull` won't work for a sensitive value, so just
re-add it. The rest of this section is the original setup guide, kept for reference.

The contact form originally did not send email. The Vercel project `michaelprimak-ca-next` has
**zero environment variables**, so `src/app/actions/contact.ts` short-circuits at its
`if (!apiKey)` branch and returns:

> "The form isn't connected to email yet — please email me directly at michaelsprimak@gmail.com."

Nobody is lost — the email address, LinkedIn and GitHub sit right beside the form — but
the primary call to action is decorative until this is done.

### The one thing that matters

Resend will not let you send from your own address until you verify a domain. The
fallback sender `onboarding@resend.dev` **can only deliver to the email address the
Resend account was registered with.**

The form sends to `michaelsprimak@gmail.com` (`site.email` in `src/content/site.ts`).

**So: register the Resend account with `michaelsprimak@gmail.com` and it works
immediately, with no DNS setup.** Register with anything else and the form fails
silently. That is the only real decision here.

### Step 1 — create the account

<https://resend.com/signup>, using **`michaelsprimak@gmail.com`**.
Free tier is 100 emails/day, 3,000/month.

### Step 2 — create an API key

Resend dashboard → **API Keys** → **Create API Key**. Name it `michaelprimak.ca`,
permission **Sending access**. Copy the key (starts `re_`) — it is shown once.

### Step 3 — put the key on Vercel

Paste into PowerShell. It prompts for the value; paste the key **at the prompt**, not
into the command:

```powershell
cd C:\Users\avoca\mpnew; npx vercel env add RESEND_API_KEY production
```

The folder is already linked to `michaelprimak-ca-next`, so no other arguments are needed.

### Step 4 — redeploy and test

Environment variables only apply to new deployments, so force one:

```powershell
cd C:\Users\avoca\mpnew; git commit --allow-empty -m "Redeploy to pick up RESEND_API_KEY"; git push
```

Wait about a minute, then submit the form at <https://www.michaelprimak.ca/#contact>.
It should arrive at michaelsprimak@gmail.com. **Check spam** — first mail from a new
Resend account often lands there.

### Optional, later

To send from `mike@michaelprimak.ca` instead of `onboarding@resend.dev` (and to be able
to receive form mail at any address), verify the domain in Resend → Domains, add the DNS
records **at GoDaddy** (see DNS below), then set `CONTACT_FROM_EMAIL`. Not required.

---

## What the site is now

Positioning changed on 2026-09-08. It had been written for **freelance clients** — hero
"I build websites for small and mid-sized businesses", primary CTA "Start a project".
But the active effort is a **senior-engineer job search** (17 jobs marked apply-yes in
`C:\Users\avoca\job-search`), and those hiring managers were landing on a sales page.

It now leads with engineering and keeps the freelance offer lower:

- **Hero** — "I design, build and run products end to end", a scannable stack row, two
  CTAs (See the work / Open to senior roles and freelance projects).
- **Order** — Work (01), How I build (02), Experience (03), Freelance (04), Contact (05).
- **"How I build"** — was a client sales process (scope → preview → hand over the keys).
  Now engineering evidence, aimed at what postings actually ask for: AI 61%, testing 39%,
  CI/CD 31%, measured across 1,120 postings in the job-search dataset.

### Claims are verified against the repo, not the skills list

The job-search report recommended claiming Playwright and Vitest. **The Good Fights repo
does not use them.** It uses **Jest** (12+ test files under `packages/backend`), **34
GitHub Actions workflows**, and **Docker**. The site says what is true. Do not "upgrade"
these claims without re-checking `C:\Users\avoca\fight-mobile-app`.

The strongest single proof point is
`packages/backend/src/services/aiEnrichment/postFight/verifyPunditQuotes.test.ts` — a
unit test that checks the LLM's quoted material is real. Very few people claiming "AI
experience" can point at something like that.

### Numbers on the site

From `npx tsx scripts/portfolio-stats.ts` in `fight-mobile-app/packages/backend` (reads
`.env.production`; re-run any time to refresh):

| | |
|---|---|
| Registered users | 3,415 |
| Fight ratings submitted | 76,516 |
| Written reviews | 1,450 |
| Fights / events / fighters | 15,730 / 1,635 / 10,567 |
| News articles (auto-written) | 3,670 |
| Catalogue spans | 1993 – 2027 |

**Two counts, both true.** The hero card is live from `/api/fights` and reads ~15,344 /
1,573 — lower because `src/routes/fights.ts` excludes cancelled fights and shelved
promotions, i.e. what a user can actually see. The case study quotes the full database
figures. The card is labelled "fights live in the app" so the two don't read as a
contradiction. **Interview answer:** "15,730 in the database; about 15,344 surface in the
app once cancelled bouts and shelved promotions are filtered out."

**Store numbers are deliberately absent.** Google Play shows 100+ downloads and no public
rating; App Store 4.9★ from 8 ratings; Play Console 4.6★ from 10. They undersell badly
next to 76,516 ratings, and quoting "4.9★" invites a click-through that finds 8 reviews.
The 3,415 users came largely from migrating the Fighting Tomatoes user base — that
migration is stated in the case study, so the gap between 3,415 users and 100+ Android
installs already has an answer on the page.

---

## Changes on 2026-09-09

Mike's list, all done and pushed:

- Hero: new lede, "See some of my work", both calls to action are the same size
  (grid row; `variant="outline"` on the second), live card header reads
  "● Live data from one of my projects" with the Good Fights icon + name on the right,
  headshot is 70% of the viewport width on phones.
- "How I build" is now **"How I work"** (nav, eyebrow, content): heading "If it can be
  built, I can build it", intro about 20 years of hand-written code now fully
  AI-assisted, and a fourth step "By hand, and with AI" ahead of the three AI /
  testing / infrastructure ones. Four columns on desktop.
- **Listen buttons** (`src/components/listen-button.tsx`): every home-page section and
  each case study has one; it reads the section with the browser's built-in speech
  synthesis (Web Speech API), no key, no network. `data-no-read` on an element skips
  it (the form, buttons). Chrome cuts off long utterances, so it queues ~220-char
  chunks. Hidden automatically where the API is missing.
- **Back button** (`src/components/section-link.tsx`): in-page links (`/#work` etc.)
  scroll and `replaceState` instead of pushing history, so Back leaves the site
  instead of walking through every section. `Button` and `TextLink` use it.
- Header is sticky on phones; the mobile menu's "Get in touch" now closes the menu
  (the `Button` link form was dropping `onClick`).
- Contact: form first, "Or reach me directly" under it.
- Copy: avoidjawsurgery "legacy WordPress site", "slow, expensive, tedious to keep
  patched"; Meaford "lets patients book", Google Analytics + Business Profile bullet,
  "Many patients are older, so clarity and ease of use are everything"; LGBT Voice
  "A beautiful design..." bullet.
- Résumé: skills rows are flex so a wrapped line aligns under the text column, and
  "AI-assisted" no longer breaks at the hyphen. PDF regenerated (real Calibri).
- **Meaford Osteopathy demo.** meafordosteopathy.com now redirects to a Squarespace
  site, so Mike's build is not live anywhere. `scripts/build-meaford-demo.mjs` renders
  the original PHP (variables + includes, no database) to static HTML in
  `public/demo/meaford-osteopathy/`, one folder per page, copying only the 56 assets
  the pages reference (6.6 MB, not the theme's 430 MB). `next.config.ts` has two
  afterFiles rewrites so `/demo/meaford-osteopathy` and `/demo/meaford-osteopathy/<Page>`
  serve the folder's index.html. The case study links to it ("See the site").
  Rebuild: `MEAFORD_PHP=<path to php.exe> node scripts/build-meaford-demo.mjs`
  (source: `C:Usersavocamichaelprimak-caprojectsMeafordOsteopathy`; a portable
  PHP zip from windows.php.net works, nothing needs installing).
  **Not yet verified in a real browser**: the theme (Canvas) renders blank in headless
  Chrome, for the original PHP too, so the screenshots proved nothing either way.
  Every referenced asset returns 200. Open it and look.

## Also done later on 2026-09-09

- **Good Fights numbers are live everywhere.** New backend endpoint
  `GET /api/public-stats` (fight-mobile-app commit bd01d6cf, deployed on Render) returns
  fightRatings, hypeRatings, totalRatings, reviews, users, fights, events, fighters, cached
  an hour per process. `src/lib/good-fights.ts` reads it plus `/api/fights` and
  `/api/events` (the app-visible counts), with a `fill()` helper that replaces `{users}`,
  `{fightRatings}` etc. in copy. The hero paragraph, the live card and the Good Fights case
  study all use it; both pages have `revalidate = 3600`. "Updated hourly" means
  stale-while-revalidate: the first visit after an hour serves the old page and rebuilds;
  the next visit is fresh. Card shows "fights covered" (app-visible) and "user ratings"
  (fight ratings + hype scores); the case study says "fight ratings" (post-fight only).
- **Contact form UX**: controlled inputs (a failed submit no longer wipes the fields), live
  validation after the first attempt, rules shared with the server in
  `src/lib/contact-validation.ts`. No subject dropdown; message placeholder written for
  hiring managers; only the email address under "Or email me directly at".
- **Navigation**: no global `scroll-behavior: smooth` (it made Next's scroll reset on page
  change look like the same page scrolling up); SectionLink does smooth in-page scrolls;
  case studies fade in (`.page-enter`).
- **Case studies**: "hard parts" block is full width, titles never wrap (clamp on narrow
  phones, `MAX_HARD_PART_TITLE = 36` enforced at build). Logos 240/360px. Meaford hard
  parts rewritten: Ultra Easy To Use, Keeping it simple, Google Business Profile.
- **Tailwind gotcha**: a class glued to a `${}` expression inside a template literal is
  not scanned (`sm:size-[360px]${blend}` produced no CSS). Build class lists with
  `[...].join(" ")`. Also: `backdrop-filter` on the header made it the containing block
  for the fixed mobile menu; the header background is a plain solid colour for that reason.
- Copy: Coordinator (not Manager), "Resume" without accents, nav "Selected work" /
  "Working style", hero lede without technology names, "Download resume" in the eyebrow
  line, outlined "PDF resume" button.

## Outstanding

1. **Meaford demo in a real browser.** /demo/meaford-osteopathy renders blank in headless
   Chrome (so does the original PHP), so it was never visually confirmed. Open it once.
2. **Eyeball avoidjawsurgery on the home page and its case study.** It is rendered like
   Meaford and LGBT Voice (`image.kind: "logo"`), which applies `mix-blend-multiply` in
   light mode — designed for logos on white. On a dark X-ray image it may look muddy. If
   so, exempt it from that class in `src/components/work.tsx` (`Thumb`) and
   `src/app/work/[slug]/page.tsx`. A cropped 1170×800 wide version is in git history at
   `cda9e84` if you'd rather go back to that.
3. **The repo is private.** Nothing links to it now (the "How this site was built" link
   was removed on request; the page still exists at
   `src/app/how-this-site-was-built/page.tsx`, unlinked and out of the sitemap). Make the
   repo public or delete the page.
4. **Listen buttons** use the browser's own voices; quality varies by device. If a
   consistent voice matters, pre-generate audio per section with a paid TTS service.
5. **`resume/Michael-Primak-Resume.html` is the source of the PDF.** If you edit it,
   regenerate with headers off — Chrome's print dialog otherwise bakes in a date stamp
   and your local file path:
   ```powershell
   Start-Process -Wait -FilePath "C:\Program Files\Google\Chrome\Application\chrome.exe" -ArgumentList @("--headless=new","--disable-gpu","--no-first-run","--user-data-dir=$env:TEMP\chrome-headless-profile","--no-pdf-header-footer","--print-to-pdf=C:\Users\avoca\mpnew\public\Michael-Primak-Resume.pdf","file:///C:/Users/avoca/mpnew/resume/Michael-Primak-Resume.html")
   ```
   The separate `--user-data-dir` matters: without it, a Chrome that is already open
   swallows the command and exits 0 having written nothing. Check the result embeds
   `Calibri`, not `Carlito` (`Select-String -Path public\Michael-Primak-Resume.pdf -Pattern "BaseFont"`);
   Carlito means it was printed on a machine without Calibri. Regenerated with real
   Calibri on 2026-09-09 (`ef85134`).

---

## Infrastructure

    NEW  project michaelprimak-ca-next  prj_B3tuqgsEKnujZCeXa5YGo65LCDSx   <- serves the domain
    OLD  project michaelprimak-ca       prj_0Ar49duyGMiszDf579YT2KM9c5En   <- do NOT delete, this is the rollback
    team michael-primaks-projects       team_Bn7tGQctGzWXvu1WTA4kIUjv
    repo github.com/mikeprimak/michaelprimak-ca (branch main)

**Deploys happen from GitHub.** The project is connected to the repo through Vercel's
Git integration; every push to `main` builds and goes to production in about 20 s.
Verified 2026-09-09: all seven commits pushed that day each produced a production
deployment, and the Vercel API reports `source: git` with the matching commit SHA on
each. The folder is also CLI-linked (`.vercel/project.json`), so `npx vercel --prod`
works as a manual fallback, but it is never needed for a normal push.

**Do not read the absence of a GitHub status check as "not deploying."** The Vercel
GitHub app was not posting checks to commits on this repo when this was investigated,
yet the deployments were happening. If the live site looks stale, the order of checks is:
(1) hard-refresh or open in a private window; phones in particular cache aggressively,
and that was the whole story on 2026-09-09; (2) `npx vercel ls --prod` in this folder
and compare the newest deployment's age to the push time; (3)
`npx vercel inspect https://www.michaelprimak.ca` to see which commit is serving;
(4) only then look at the Deployments tab for a failed build.

Note: Vercel's deployment metadata reports the repo as **public**, while the notes
below say private. Check the repo's visibility on GitHub before relying on either.

**DNS is at GoDaddy, not Vercel** — the previous handoff assumed Vercel and was wrong.
Nameservers are `ns31/ns32.domaincontrol.com`. Apex and `www` both A-record to Vercel's
edge IP `76.76.21.21`, which is why the cutover needed no DNS change at all: it was
purely a project reassignment inside Vercel.

Vercel shows a "DNS Change Recommended" notice suggesting a per-project CNAME.
**Ignore it.** Vercel's own note says the legacy records keep working, and the apex
cannot take a CNAME anyway (DNS forbids CNAME at a zone apex, and GoDaddy has no
ALIAS/ANAME), so you'd end up with a split setup for no gain.

Procedure note: `vercel domains add --force` does **not** move a domain between projects
— it returns `alias_conflict`. The move was done in the dashboard.

### Backup

`C:\Users\avoca\michaelprimak-ca-BACKUP-2026-09-08\` (425 MB)

- `michaelprimak-ca-local-folder.tar.gz` — the old CRA build folder, node_modules excluded
- `live-mirror/` — what the domain actually served, all 30 hashed assets fetched over HTTP
- `RESTORE.md` — rollback steps

Rollback: remove the domain from `michaelprimak-ca-next` in the dashboard, add it back to
`michaelprimak-ca`. No DNS change for that either.

---

## Editing

All copy lives in two files. No component changes needed for text or new projects.

- `src/content/site.ts` — hero, stack chips, "How I build", experience timeline, services, contact
- `src/content/projects.ts` — case studies; append an object to add one

Screenshots carry their own `width`/`height` (added 2026-09-08). Pass the file's real
pixel size: one hardcoded box per kind cannot fit both a 0.450 phone screenshot and a
1.462 web one without squashing something.

The home page renders work through `src/components/work.tsx`, which is **separate** from
the case-study renderer in `src/app/work/[slug]/page.tsx`. Both read `screenshots` now,
but they were out of sync once already — if you add images, check both surfaces.

    npm run dev          # localhost:3000
    npm run build        # must be clean before pushing
    npx eslint .

---

## Related: the job search

`C:\Users\avoca\job-search` — read its `README.md` first, it is the source of truth there.

Two edits were made to its `profile.json` on 2026-09-08 so the analyzer pitches accurately:

- The Zerion role is named and dated (**Apr–Nov 2024**). It had been recorded as a
  "three-month contract"; it was eight months. It is also the only client-facing
  engineering on the résumé, which answers the "only ever worked solo" gap the analysis
  kept raising against the top-ranked jobs, and it is the evidence for the nine
  implementation/solutions-engineer titles in `adjacent_titles` that previously had none.
- The Good Fights proof point now carries the real numbers and the 51-table schema.

**The actual bottleneck has not moved: 17 jobs are marked "apply: yes" and zero
applications have been sent.** Order from the report: GoodTime, Bullpen Capital,
commonsku (all Canada-scoped, eligibility and pay already settled), then Maze and Leap
Tools, then the two Blacksmith WordPress roles and Fueled. The site and CV were the last
excuse; both are done.

---

## Commits this session

    (2026-09-09) one commit: Mike's edit list — see "Changes on 2026-09-09"
    1c8e37d  Render avoidjawsurgery like the other client projects
    d44c8ed  Show screenshots on the home page too
    cda9e84  Add avoidjawsurgery screenshot; per-image intrinsic sizes
    63c6c83  Add Good Fights app screenshots
    2c8daa3  Reconcile the two Good Fights counts on the page
    58eb3a1  Fix hero headshot being clipped
    144ab04  Reposition site around engineering evidence; fill in real content

The 2026-08-28 handoff (build/deploy history, design decisions, recovered old-site
inventory) is preserved as `HANDOFF-2026-08-28.md.bak`.
