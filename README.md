# michaelprimak.ca

Personal site for Mike Primak — freelance web & mobile developer. Built with Next.js (App Router), TypeScript and Tailwind CSS; deployed on Vercel.

## Editing content

All copy lives in two files — no component changes needed for text edits:

- `src/content/site.ts` — name, links, hero, services, how-I-work, experience, contact.
- `src/content/projects.ts` — case studies. Add an object to the array and both the home-page card and the `/work/<slug>` page appear.

Images go in `public/`. The résumé is `public/Michael-Primak-Resume.pdf`.

## Running locally

```bash
npm install
cp .env.example .env.local   # add RESEND_API_KEY to test the contact form
npm run dev
```

## Deploying

Every push to `main` deploys to production on Vercel; every other branch gets a preview URL.

## Design

The approved design mock and its source are in `design/mock/`. `HANDOFF.md` is the running project brief.
