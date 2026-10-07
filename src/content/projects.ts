/**
 * Case studies. In the Good Fights entry, `{users}`, `{fightRatings}`, `{reviews}`, `{fights}`,
 * `{events}`, `{fighters}` are replaced with live numbers when the page renders
 * (src/lib/good-fights.ts), so the copy stays in step with production. To add a project: append an object here - the home page card and
 * the /work/<slug> page are generated from it. Keep `featured` on exactly one; `volunteer`
 * entries render in the Volunteer section instead of Projects.
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
  /** Volunteer work: shown in the Volunteer section instead of Projects. */
  volunteer?: boolean;
  /** Logo or icon shown on cards. Path under /public. */
  /** `logo` is blended onto the card (designed for logos on white); `artwork` is a
   *  full-bleed image such as a site screenshot and must not be blended. */
  image?: { src: string; alt: string; kind: "icon" | "logo" | "artwork" };
  /** Screenshots for the case study page. Paths under /public. Empty = placeholder frames.
   *  width/height are the file's real pixel size - pass them so the layout box matches the
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
  /** "stats" (default) renders big figures. "quote" renders a single pull quote -
   *  a sentence set at the stat size wraps badly. */
  outcomeKind?: "stats" | "quote";
  outcome: { value: string; label: string }[];
};

export const projects: Project[] = [
  {
    slug: "good-fights",
    title: "Good Fights",
    summary:
      "A fight-tracking app for combat-sports fans. It's live on the App Store and Google Play, and is kept current daily by an automated system.",
    deck: "A fight-tracking app for combat-sports fans. It's live on iOS, Android and Web, and is kept current by automated systems.",
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
    kind: "iOS, Android & Web",
    featured: true,
    image: { src: "/good-fights-icon.png", alt: "Good Fights app icon", kind: "icon" },
    screenshots: [
      {
        src: "/good-fights-home.png",
        width: 1080,
        height: 2400,
        alt: "Good Fights home screen: events for Saturday September 12th, each card carrying its poster, start time and broadcaster, with the UFC Fight Night card expanded to show four hype-rated fights scored 7.5 to 9.2.",
      },
      {
        src: "/good-fights-event.png",
        width: 1080,
        height: 2400,
        alt: "An event page: the UFC Fight Night Silva vs Delgado poster, a written preview, an add-to-calendar action, Canadian broadcast listings for Sportsnet+ and Paramount+, and the main card with a hype score beside every fight.",
      },
      {
        src: "/good-fights-hype.png",
        width: 1080,
        height: 2400,
        alt: "The rating sheet: How hyped are you for Silva vs Miguel Delgado, scored 8 out of 10 on a colour-graded flame scale, with a box for why and a link to the comments.",
      },
    ],
    screenshotKind: "phone",
    meta: [
      { label: "Role", value: "Founder · sole developer" },
      { label: "Platforms", value: "iOS · Android · Web" },
      {
        label: "Stack",
        value:
          "React Native (Expo), Node/Fastify in TypeScript, PostgreSQL + Prisma, Next.js, Docker on Render, a Linux VPS for the daily automations and live trackers, Cloudflare R2",
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
      "Film fans have Rotten Tomatoes. Fight fans had nothing - no place to rate an individual fight, see what the crowd thought, or see what's hyped in upcoming weeks.",
      "Fighting Tomatoes, my earlier web version, proved people wanted this. Good Fights is the mobile-first successor, with advanced functionality and user reach.",
    ],
    shipped: [
      "iOS and Android apps from one React Native codebase.",
      "Migrated the legacy Fighting Tomatoes accounts onto the new platform. Good Fights users have submitted {totalRatings} fight ratings on {fightsInApp} fights dating back to 1993.",
      "A REST API in TypeScript on PostgreSQL, shared by the apps and the Next.js web version at goodfights.app.",
      "Claude-based enrichment that writes fight, fighter and event detail, gated on a confidence score so nothing the model is unsure about is published - with unit tests that check its output, including one that verifies quoted material is real.",
      "More than 30 scheduled jobs on the VPS, each with per-job locking and failure alerts, running the scrapers, Brave Search lookups, Claude API enrichment, database backups, deduplication and content-freshness checks.",
      "A Remotion video pipeline that renders promo clips from live database data, with generated voice-over, plus an automated content system that writes an SEO-focused preview and results article for every numbered UFC card and refreshes a monthly fighter-rankings article from live data.",
      "Over-the-air updates so fixes reach users without a new store submission.",
    ],
    architecture: "good-fights",
    hardParts: [
      {
        title: "Live trackers that stay accurate",
        body: "Good Fights promises to let users know exactly when the fight they want to watch is about to start. This means tracking events while they are live to determine exactly when each fight ends and the next one starts, and doing this consistently across 15+ organizations, week in, week out. So I built trackers that handle complex and changing data sources, degrade gracefully and alert me when there are any issues.",
      },
      {
        title: "Clear the moment you open it",
        body: "A first-time user has to grasp what they are looking at and what to do, without having to figure it out. This meant limiting feature creep and creating a UI optimized for immediate, intuitive understanding.",
      },
      {
        title: "Developing functionality users actually want",
        body: "Identifying valuable use cases for Good Fights and building clean solutions. Good Fights started as rating historic fights only, but has expanded to include hyping upcoming fights, comments, fighter walkout notifications and more. Each of these was built out in response to user feedback.",
      },
    ],
    outcome: [
      { value: "{fightRatings}", label: "fight ratings submitted by users" },
      { value: "{reviews}", label: "written reviews" },
      { value: "{fights}", label: "fights catalogued across {events} events" },
    ],
  },
  {
    slug: "lgbt-voice-tanzania",
    title: "LGBT Voice Tanzania",
    summary:
      "Re-built an old WordPress site using a modern WordPress framework. Made the website easier to maintain, nicer looking, and more comprehensive.",
    deck: "A WordPress site for an LGBT+ advocacy organization, built so the team can run it themselves.",
    tags: ["WordPress", "Non-profit"],
    kind: "WordPress · Non-profit",
    volunteer: true,
    image: { src: "/logo-lgbt-voice.png", alt: "LGBT Voice logo", kind: "logo" },
    screenshots: [],
    screenshotKind: "web",
    meta: [
      { label: "Role", value: "Volunteer developer" },
      { label: "Organization", value: "LGBT Voice Tanzania" },
      { label: "Stack", value: "WordPress" },
    ],
    links: [{ label: "lgbtvoicetz.org", href: "https://lgbtvoicetz.org/" }],
    problem: [
      "An advocacy organization needed an update to its old WordPress site. I migrated all their content to a modern WordPress configuration, redesigned and built out features and content, then handed it back to the organization for daily posting and maintenance.",
    ],
    shipped: [
      "A WordPress site set up so the team can publish news and pages without a developer.",
      "A clear structure for who the organization is, what it does, and how to get involved.",
      "A beautiful design that effectively communicates the organization's work and the coverage it has earned.",
    ],
    hardParts: [
      {
        title: "Working across an ocean",
        body: "I am in Canada; the organization and its web host are in Tanzania. Anything that touches hosting, DNS or server access goes through the host by email, so a step that takes minutes in the same room takes days. Every question had to be asked up front and the work planned in batches, so nothing sat waiting on a reply.",
      },
      {
        title: "Built for hand-off",
        body: "The measure of success was the team not needing me afterwards: a simple theme, sensible defaults and no custom code to break.",
      },
      {
        title: "All their content, beautifully told",
        body: "What existed about the organization was scattered across the web: coverage, references and material published elsewhere. I gathered it, judged what belonged, and shaped it into pages that read as one coherent account of who they are and what they do. Then it had to look the part: an advocacy group has to appear credible and cared-for to be taken seriously, with no design team and no budget, so much of the effort went into a design that feels considered.",
      },
    ],
    outcome: [{ value: "Live", label: "and maintained by the organization" }],
  },
];

// "The big challenges" titles wrap onto a second line when they need to (Mike supplied a
// 44-character title on 2026-09-17, which ended the earlier one-line rule).

export const featuredProject = projects.find((p) => p.featured) ?? projects[0];
export const otherProjects = projects.filter((p) => p !== featuredProject && !p.volunteer);
export const volunteerProjects = projects.filter((p) => p.volunteer);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
