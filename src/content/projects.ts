/**
 * Case studies. To add a project: append an object here — the home page card and
 * the /work/<slug> page are generated from it. Keep `featured` on exactly one.
 * Anything in [square brackets] is a placeholder still to be filled in.
 */

export type Project = {
  slug: string;
  title: string;
  /** One line under the title on the home card. */
  summary: string;
  /** Slightly longer line at the top of the case study page. */
  deck: string;
  tags: string[];
  /** Short label pair shown on the small home cards, e.g. "Business site · Booking". */
  kind: string;
  featured?: boolean;
  /** Logo or icon shown on cards. Path under /public. */
  image?: { src: string; alt: string; kind: "icon" | "logo" };
  /** Screenshots for the case study page. Paths under /public. Empty = placeholder frames.
   *  width/height are the file's real pixel size — pass them so the layout box matches the
   *  image's aspect ratio and nothing gets squashed. */
  screenshots: { src: string; alt: string; width?: number; height?: number }[];
  screenshotKind: "phone" | "web";
  meta: { label: string; value: string }[];
  links: { label: string; href: string }[];
  problem: string[];
  shipped: string[];
  /** Renders the architecture diagram when true (Good Fights only, for now). */
  architecture?: "good-fights";
  hardParts: { title: string; body: string }[];
  outcome: { value: string; label: string }[];
};

export const projects: Project[] = [
  {
    slug: "good-fights",
    title: "Good Fights",
    summary:
      "A fight-rating app for combat-sports fans — live on the App Store and Google Play, with a fight catalogue going back to 1993 that daily scrapers keep current.",
    deck: "A fight-rating app for combat-sports fans — live on the App Store and Google Play, with a catalogue going back to 1993.",
    tags: [
      "React Native · Expo",
      "TypeScript",
      "Node",
      "PostgreSQL · Prisma",
      "Next.js",
      "LLM enrichment",
      "Docker",
      "GitHub Actions",
      "iOS + Android",
    ],
    kind: "Mobile app · Founder",
    featured: true,
    image: { src: "/good-fights-icon.png", alt: "Good Fights app icon", kind: "icon" },
    screenshots: [
      {
        src: "/good-fights-events.png",
        width: 648,
        height: 1440,
        alt: "Good Fights home screen: upcoming cards grouped by day, each with its poster, start time, broadcaster and a list of hype-rated fights.",
      },
      {
        src: "/good-fights-upcoming.png",
        width: 648,
        height: 1440,
        alt: "The Upcoming tab: promotion filters, an event hero, Canadian broadcast listings for Sportsnet+ and Paramount+, and the main card with a hype score against each fight.",
      },
      {
        src: "/good-fights-rate.png",
        width: 648,
        height: 1440,
        alt: "Rating a fight: Swanson vs Choi at UFC 206 scored 10 out of 10 on a colour-graded scale, with a written review and a link to the comments.",
      },
    ],
    screenshotKind: "phone",
    meta: [
      { label: "Role", value: "Founder · sole developer" },
      { label: "Platforms", value: "iOS · Android · Web" },
      {
        label: "Stack",
        value:
          "React Native (Expo), Node/Express in TypeScript, PostgreSQL + Prisma, Next.js, Docker on a Linux VPS, Cloudflare R2",
      },
    ],
    links: [
      { label: "goodfights.app", href: "https://goodfights.app" },
      { label: "App Store", href: "https://apps.apple.com/ca/app/good-fights/id6757172609" },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.fightcrewapp.mobile",
      },
    ],
    problem: [
      "Film fans have Rotten Tomatoes. Fight fans had nothing — no place to rate an individual fight, see what the crowd thought, or find the great ones they missed.",
      "Fighting Tomatoes, my earlier web version, proved people wanted this. Good Fights is the mobile-first successor, built to live on both app stores with a real back-end behind it.",
    ],
    shipped: [
      "iOS and Android apps from one React Native codebase, published through App Store and Play Store review.",
      "Accounts with email and Google sign-in, and a migration that carried the existing Fighting Tomatoes user base onto the new platform — 3,415 registered users who have submitted 76,516 fight ratings and 1,450 written reviews.",
      "A catalogue of 15,730 fights across 1,635 events dating to 1993 — 10,567 fighters, results and stats — kept current by daily scrapers.",
      "A REST API in TypeScript on PostgreSQL, shared by the apps and the Next.js web version at goodfights.app.",
      "Claude-based enrichment that writes fight and fighter detail, gated on a confidence score so nothing the model is unsure about is published — with unit tests that check its output, including one that verifies quoted material is real.",
      "34 scheduled GitHub Actions workflows running the scrapers, enrichment, database backups, deduplication and content-freshness checks.",
      "A Remotion video pipeline that renders promo clips from live database data, with generated voice-over, plus 3,670 automatically written news articles.",
      "Over-the-air updates so fixes reach users without a new store submission.",
    ],
    architecture: "good-fights",
    hardParts: [
      {
        title: "Two app stores, one release",
        body: "Getting through Apple and Google review on every version, and keeping a release cadence that doesn't leave users stranded on an old build.",
      },
      {
        title: "Updating without resubmitting",
        body: "Over-the-air updates have rules about which builds they can target. Getting that right meant fewer store submissions and faster fixes.",
      },
      {
        title: "Trusting a model in production",
        body: "An LLM that is right most of the time is not good enough when the output is published as fact. Every enriched field carries a confidence score and is dropped below a threshold, and the enrichment code is unit-tested like any other service — including a test that checks quoted material against the source.",
      },
      {
        title: "Running the whole stack myself",
        body: "Docker and nginx on a Linux VPS, Prisma migrations against Postgres, Cloudflare R2 for images, cron for the overnight jobs, PostHog for behaviour. No platform team — scheduled jobs moved off paid CI onto a server I run, with enough monitoring to know when something breaks.",
      },
    ],
    outcome: [
      { value: "76,516", label: "fight ratings submitted by users" },
      { value: "3,415", label: "registered users" },
      { value: "15,730", label: "fights catalogued across 1,635 events" },
    ],
  },
  {
    slug: "avoidjawsurgery",
    title: "avoidjawsurgery.com",
    summary:
      "A WordPress site rebuilt as fast, dependency-free static HTML — every page migrated word-for-word, redesigned, and ready to host anywhere.",
    deck: "A WordPress site rebuilt as fast, dependency-free static HTML — every page migrated word-for-word and redesigned.",
    tags: ["Static HTML", "AI-assisted", "Migration"],
    kind: "Static rebuild · AI-assisted",
    image: {
      src: "/avoidjawsurgery.png",
      alt: "avoidjawsurgery.com — “Avoid Jaw Surgery” over a panoramic jaw X-ray",
      kind: "logo",
    },
    screenshots: [],
    screenshotKind: "web",
    meta: [
      { label: "Role", value: "Developer" },
      { label: "Type", value: "WordPress → static HTML migration" },
      { label: "Stack", value: "HTML, CSS, JavaScript — no build step, no CMS" },
    ],
    links: [{ label: "avoidjawsurgery.com", href: "https://avoidjawsurgery.com" }],
    problem: [
      "The original site ran on WordPress on shared hosting: slow, expensive to keep patched, and fragile to edit. The content — a dozen long-form pages and over a hundred testimonials — was the valuable part, and it was locked inside the CMS.",
    ],
    shipped: [
      "Every page and all 100+ testimonials migrated word-for-word, with source links preserved.",
      "A complete visual redesign: modern dark theme, responsive, with a mobile menu and scroll-to-top.",
      "Plain HTML, CSS and JavaScript — no dependencies, no build step, so it can be hosted anywhere for next to nothing.",
      "Sitemap and robots set up so search rankings carried over.",
    ],
    hardParts: [
      {
        title: "Nothing lost in the move",
        body: "Long pages, embedded links and testimonials had to come across exactly. The content was scraped from the live site and checked page by page.",
      },
      {
        title: "Redesign without a framework",
        body: "A modern look built with one stylesheet and no framework, so the site stays fast and stays editable by anyone who can read HTML.",
      },
      {
        title: "AI-assisted, human-reviewed",
        body: "The migration was done with Claude Code driving the repetitive work, with every page reviewed before it shipped — a fraction of the usual time for a rebuild this size.",
      },
    ],
    outcome: [
      { value: "13", label: "pages migrated word-for-word" },
      { value: "100+", label: "testimonials preserved" },
      { value: "0", label: "dependencies, frameworks or build steps" },
    ],
  },
  {
    slug: "meaford-osteopathy",
    title: "Meaford Osteopathy",
    summary:
      "Business website for a local health clinic, with an integrated booking system — the kind of site most small businesses actually need.",
    deck: "A business website for a local health clinic, with online booking built in.",
    tags: ["Business site", "Booking", "HTML · JavaScript"],
    kind: "Business site · Booking",
    image: { src: "/logo-meaford-osteopathy.png", alt: "Meaford Osteopathy logo", kind: "logo" },
    screenshots: [],
    screenshotKind: "web",
    meta: [
      { label: "Role", value: "Designer & developer" },
      { label: "Client", value: "Meaford Osteopathy — a clinic in Meaford, Ontario" },
      { label: "Stack", value: "HTML, CSS, JavaScript, third-party booking integration" },
    ],
    links: [
      // TODO(Mike): add the live URL if the site is still up.
      { label: "Source on GitHub", href: "https://github.com/mikeprimak/MeafordOsteopathy" },
    ],
    problem: [
      "A one-practitioner clinic needed what most small businesses need: a site that says what the clinic does, where it is, and lets patients book without a phone call.",
    ],
    shipped: [
      "Pages for services, the practitioner, location and contact — written to be found by local search.",
      "An integrated booking system so patients can book appointments directly from the site.",
      "A design the client could keep updating with simple edits.",
    ],
    hardParts: [
      {
        title: "Booking that just works",
        body: "The booking tool had to feel like part of the site, not a bolt-on, on both phone and desktop.",
      },
      {
        title: "Right-sized",
        body: "No CMS, no framework, no monthly bills beyond hosting — matched to what a small clinic actually needs to maintain.",
      },
    ],
    outcome: [{ value: "“Patients love it”", label: "— the client, after launch" }],
  },
  {
    slug: "lgbt-voice-tanzania",
    title: "LGBT Voice Tanzania",
    summary:
      "Website for an LGBT+ advocacy organization, built on WordPress so the team can publish and manage it themselves.",
    deck: "A WordPress site for an LGBT+ advocacy organization, built so the team can run it themselves.",
    tags: ["WordPress", "Non-profit"],
    kind: "WordPress · Non-profit",
    image: { src: "/logo-lgbt-voice.png", alt: "LGBT Voice logo", kind: "logo" },
    screenshots: [],
    screenshotKind: "web",
    meta: [
      { label: "Role", value: "Developer" },
      { label: "Client", value: "LGBT Voice Tanzania" },
      { label: "Stack", value: "WordPress" },
    ],
    links: [{ label: "lgbtvoicetz.org", href: "https://lgbtvoicetz.org/" }],
    problem: [
      "An advocacy organization needed a public home for its work that a small, non-technical team could update on their own, from anywhere.",
    ],
    shipped: [
      "A WordPress site set up so the team can publish news and pages without a developer.",
      "A clear structure for who the organization is, what it does, and how to get involved.",
    ],
    hardParts: [
      {
        title: "Built for hand-off",
        body: "The measure of success was the team not needing me afterwards: a simple theme, sensible defaults and no custom code to break.",
      },
    ],
    outcome: [{ value: "Live", label: "and maintained by the organization" }],
  },
];

export const featuredProject = projects.find((p) => p.featured) ?? projects[0];
export const otherProjects = projects.filter((p) => p !== featuredProject);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
