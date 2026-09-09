# michaelprimak.ca — handoff

**Status 2026-09-08: LIVE.** The new Next.js site is serving michaelprimak.ca. Cutover is
done, the old site is backed up, and every content placeholder is filled.

Two tasks are outstanding. The deploy check (added 2026-09-09) comes first because
nothing else matters until the live site reflects `main`.

---

# START HERE (2026-09-09) — confirm the site actually deploys from GitHub

Seven commits were pushed to `main` on 2026-09-09 from a remote Claude session
(`73a3f07` … `332e08a`): résumé accuracy fixes, the freelance/Fighting Tomatoes split,
project reorder, a "Résumé (PDF)" footer link, and a regenerated `public/Michael-Primak-Resume.pdf`.
Mike could not see any of it live.

**Suspicion:** the Vercel project `michaelprimak-ca-next` is NOT connected to the GitHub
repo, despite what the Infrastructure section below says. Evidence: no commit on GitHub
(today's or yesterday's) carries a Vercel status check, which a Git-connected project
always adds. The local folder is CLI-linked to the project, so deploys have probably
only ever happened via `vercel` from this folder.

Do this, in order:

1. `git pull` in `C:\Users\avoca\mpnew` so the working copy has all seven commits.
2. Open https://www.michaelprimak.ca and scroll to the footer. If there is no
   **Résumé (PDF)** link beside GitHub and LinkedIn, the site has not deployed today.
   (If the link IS there, deploys work and any stale PDF is browser cache — hard-refresh.)
3. Deploy now from the linked folder: `npx vercel --prod`. Re-check the footer.
4. Make pushes deploy on their own: Vercel dashboard → project `michaelprimak-ca-next` →
   Settings → Git → Connect Git Repository → `mikeprimak/michaelprimak-ca`, production
   branch `main`. Afterwards every commit on GitHub shows a Vercel check mark.
   (If the dashboard shows the repo is already connected, the problem is elsewhere —
   check Deployments for failed builds and read the build log.)
5. Optional: the PDF was printed on Linux with **Carlito** standing in for Calibri
   (metric-compatible, same two-page layout). For the true Calibri version, re-run the
   Chrome command under "Things to know" item 4 below and commit the result.
6. Correct the Infrastructure section below to say how deploys really happen, and
   delete this block once the footer link is live.

---

# START HERE — connect the contact form

The contact form does not send email. The Vercel project `michaelprimak-ca-next` has
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

## Outstanding, after the email

1. **Eyeball avoidjawsurgery on the home page and its case study.** It is rendered like
   Meaford and LGBT Voice (`image.kind: "logo"`), which applies `mix-blend-multiply` in
   light mode — designed for logos on white. On a dark X-ray image it may look muddy. If
   so, exempt it from that class in `src/components/work.tsx` (`Thumb`) and
   `src/app/work/[slug]/page.tsx`. A cropped 1170×800 wide version is in git history at
   `cda9e84` if you'd rather go back to that.
2. **Meaford Osteopathy has no live URL** — `projects.ts` links only to GitHub.
3. **The repo is private.** Nothing links to it now (the "How this site was built" link
   was removed on request; the page still exists at
   `src/app/how-this-site-was-built/page.tsx`, unlinked and out of the sitemap). Make the
   repo public or delete the page.
4. **`resume/Michael-Primak-Resume.html` is the source of the PDF.** If you edit it,
   regenerate with headers off — Chrome's print dialog otherwise bakes in a date stamp
   and your local file path:
   ```powershell
   & "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="C:\Users\avoca\mpnew\public\Michael-Primak-Resume.pdf" "file:///C:/Users/avoca/mpnew/resume/Michael-Primak-Resume.html"
   ```

---

## Infrastructure

    NEW  project michaelprimak-ca-next  prj_B3tuqgsEKnujZCeXa5YGo65LCDSx   <- serves the domain
    OLD  project michaelprimak-ca       prj_0Ar49duyGMiszDf579YT2KM9c5En   <- do NOT delete, this is the rollback
    team michael-primaks-projects       team_Bn7tGQctGzWXvu1WTA4kIUjv
    repo github.com/mikeprimak/michaelprimak-ca (private, branch main, auto-deploys)

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

    1c8e37d  Render avoidjawsurgery like the other client projects
    d44c8ed  Show screenshots on the home page too
    cda9e84  Add avoidjawsurgery screenshot; per-image intrinsic sizes
    63c6c83  Add Good Fights app screenshots
    2c8daa3  Reconcile the two Good Fights counts on the page
    58eb3a1  Fix hero headshot being clipped
    144ab04  Reposition site around engineering evidence; fill in real content

The 2026-08-28 handoff (build/deploy history, design decisions, recovered old-site
inventory) is preserved as `HANDOFF-2026-08-28.md.bak`.
