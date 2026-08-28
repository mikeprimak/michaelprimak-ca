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
  /** Screenshots for the case study page. Paths under /public. Empty = placeholder frames. */
  screenshots: { src: string; alt: string }[];
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
      "A fight-rating app for combat-sports fans — live on the App Store and Google Play, with a fight catalogue going back to 1994 that daily scrapers keep current.",
    deck: "A fight-rating app for combat-sports fans — live on the App Store and Google Play, with a catalogue going back to 1994.",
    tags: ["React Native", "Node · TypeScript", "PostgreSQL", "iOS + Android", "Next.js"],
    kind: "Mobile app · Founder",
    featured: true,
    image: { src: "/good-fights-icon.png", alt: "Good Fights app icon", kind: "icon" },
    screenshots: [], // TODO(Mike): add 3 phone screenshots to /public and list them here.
    screenshotKind: "phone",
    meta: [
      { label: "Role", value: "Founder · sole developer" },
      { label: "Platforms", value: "iOS · Android · Web" },
      {
        label: "Stack",
        value: "React Native (Expo), Node/Express in TypeScript, PostgreSQL + Prisma, Next.js",
      },
    ],
    links: [
      { label: "goodfights.app", href: "https://goodfights.app" },
      // TODO(Mike): add the App Store and Google Play listing URLs.
    ],
    problem: [
      "Film fans have Rotten Tomatoes. Fight fans had nothing — no place to rate an individual fight, see what the crowd thought, or find the great ones they missed.",
      "Fighting Tomatoes, my earlier web version, proved people wanted this. Good Fights is the mobile-first successor, built to live on both app stores with a real back-end behind it.",
    ],
    shipped: [
      "iOS and Android apps from one React Native codebase, published through App Store and Play Store review.",
      "Accounts with email and Google sign-in; ratings tied to a user's history.",
      "A fight catalogue back to 1994 — fighters, results, stats — kept current by daily scrapers.",
      "A REST API in TypeScript on PostgreSQL, shared by the apps and the Next.js web version at goodfights.app.",
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
        title: "Production on a small budget",
        body: "A lean Postgres instance, scheduled jobs moved off paid CI onto a small server, and enough monitoring to know when something breaks.",
      },
    ],
    // TODO(Mike): real numbers.
    outcome: [
      { value: "[N]", label: "installs across both stores" },
      { value: "[N]", label: "fights rated by users" },
      { value: "[N.N]★", label: "average store rating" },
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
    screenshots: [], // TODO(Mike): add a screenshot of the new site.
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
      { value: "[N]", label: "pages migrated" },
      { value: "100+", label: "testimonials preserved" },
      { value: "[N days]", label: "from start to launch" },
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
