/**
 * Site-wide content. Edit text here — no component changes needed.
 * Anything in [square brackets] is a placeholder still to be filled in.
 */

export const site = {
  name: "Mike Primak",
  legalName: "Michael Primak",
  url: "https://michaelprimak.ca",
  title: "Mike Primak — Senior full-stack developer",
  description:
    "Senior full-stack developer in Ontario, Canada. React Native, TypeScript, Node and Postgres — shipped to the App Store and Google Play, with LLM features running in production.",
  location: "Ontario, Canada",
  email: "michaelsprimak@gmail.com",
  phone: "1-289-838-2575",
  links: {
    github: "https://github.com/mikeprimak",
    linkedin: "https://www.linkedin.com/in/michael-primak/",
    repo: "https://github.com/mikeprimak/michaelprimak-ca",
  },
  resumePath: "/Mike-Primak-Resume.pdf",
  /** Reply-time promise shown next to the contact form. */
  replyTime: "one business day",
};

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "How I build", href: "/#how" },
  { label: "Experience", href: "/#experience" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];

export const hero = {
  eyebrow: "Senior full-stack developer · Ontario, Canada · Remote",
  headline: "I design, build and run products end to end.",
  lede: "Seven years shipping web and mobile products in React Native, TypeScript, Node and Postgres. Good Fights is mine from the database up: apps on both stores, a Next.js site, the API behind them, and the scrapers and LLM enrichment that keep it current — 3,415 users, 76,516 ratings, all on infrastructure I operate myself.",
  primaryCta: { label: "See the work", href: "/#work" },
  secondaryCta: { label: "Open to senior roles and freelance projects", href: "/#contact" },
  /** Compact, scannable stack line — recruiters and ATS both read this. */
  stack: [
    "TypeScript",
    "React",
    "React Native · Expo",
    "Next.js",
    "Node",
    "PostgreSQL · Prisma",
    "WordPress · PHP",
    "Docker",
    "LLM features",
  ],
};

export const work = {
  heading: "Things I've shipped.",
  intro:
    "Real products, live today. Each one has a short write-up of what was built, what was hard, and what happened after launch.",
};

export const howIWork = {
  heading: "AI in production, not just in my editor.",
  intro:
    "Everyone says they use AI now. Here is what that actually looks like when it has to survive contact with real users.",
  steps: [
    {
      title: "LLM features with guardrails",
      body: "Good Fights enriches its catalogue with Claude and gates every result on a confidence score, so nothing the model is unsure about reaches a user. There are unit tests that check the model's output — including one that verifies quoted material is real. I use Claude Code daily too, but the part that counts is the model running in production.",
    },
    {
      title: "Tested, and shipped by a pipeline",
      body: "Jest across the API and the mobile app, type-checking and linting on every package, and 34 GitHub Actions workflows running the scrapers, enrichment, database backups and content checks on schedule. Over-the-air updates push a fix to users without waiting on app-store review.",
    },
    {
      title: "I run the infrastructure",
      body: "Docker and nginx on a Linux VPS, Postgres with Prisma migrations, Cloudflare R2 for images, cron for the jobs that have to happen at 4am, PostHog for what people actually do. No platform team behind me — when production breaks at 11pm, it's me.",
    },
  ],
  callout: {
    title: "This site is a working example.",
    body: "Designed and coded with Claude Code, with me reviewing every decision — statically generated, accessible, fast, and dark-mode aware. If you want to know how something here was built, ask me.",
  },
};

export const services = {
  heading: "Available for freelance projects, too.",
  intro:
    "Alongside full-time work I take on client projects. Every one runs the same way: a short call, a written scope with a fixed price or a clear estimate, a preview link from the first week, then I launch it and hand you the keys.",
  items: [
    {
      title: "Websites & web apps",
      body: "Marketing sites, booking, dashboards, and the back-end behind them. Built to load fast, rank on Google, and be easy to update after I'm gone.",
      stack: "Next.js · React · TypeScript · WordPress · Node · PostgreSQL",
    },
    {
      title: "iOS & Android apps",
      body: "One codebase, both stores. From the first build through App Store and Play Store review, updates, and the API the app talks to.",
      stack: "React Native · Expo · REST APIs · App Store & Play Store",
    },
    {
      title: "Technical leadership",
      body: "A fractional lead for teams that need a senior hand: scoping, hiring, code review, and keeping developers, designers and customer teams pulling in one direction.",
      stack: "Fractional lead · Team management · Code review · Planning",
    },
  ],
};

export type Role = "Developer" | "Manager";

export const experience = {
  heading: "Coder and manager, at small and mid-sized organizations.",
  intro:
    "I've written the code, sat with the customer, and run the team — which is why I'm comfortable being handed any of the three.",
  timeline: [
    {
      when: "2024 – now",
      org: "Good Fights",
      role: "Founder and sole developer. React Native apps on the App Store and Google Play, a Node/TypeScript API on Postgres, a Next.js site, daily scrapers and Claude-based enrichment — successor to Fighting Tomatoes.",
      type: "Developer" as Role,
    },
    {
      when: "2024 – now",
      org: "LGBT Voice Tanzania",
      role: "Web developer. Redesigned, built, deployed and maintain the site for an LGBT rights advocacy group.",
      type: "Developer" as Role,
    },
    {
      when: "Apr 2024 – Nov 2024",
      org: "Zerion Software",
      role: "Implementation Engineer. Adapted a mobile data-collection platform to individual client use cases — talking to customers about what they were capturing, working out how the product should best receive and process it, then making the GUI and JavaScript changes to fit.",
      type: "Developer" as Role,
    },
    {
      when: "2020 – 2024",
      org: "Fighting Tomatoes",
      role: "Web developer. Built and ran the interactive web app Good Fights grew out of — JavaScript, PHP, MySQL and Python, with accounts, ratings, comments and search.",
      type: "Developer" as Role,
    },
    {
      when: "2018 – 2020",
      org: "WellnessLiving Systems Inc.",
      role: "White Label App Dept. Coordinator. Ran a team of developers, designers and support staff delivering white-label mobile apps to B2B clients.",
      type: "Manager" as Role,
    },
  ],
  education:
    "Big Data Analytics, Georgian College · BA Human Kinetics, Laurentian University · Master of Osteopathic Sciences, Canadian Academy of Osteopathy",
};

export const contact = {
  heading: "Get in touch.",
  intro: `Hiring, or have a project in mind? Tell me a little about it. I reply within ${site.replyTime}.`,
  hiringNote:
    "Open to senior full-stack, front-end and React Native roles — remote, Canada. Résumé is above, or ask and I'll send it.",
  projectTypes: [
    "A role at your company",
    "Contract work",
    "Website",
    "Mobile app",
    "Website and mobile app",
    "Team lead / technical leadership",
    "Not sure yet",
  ],
};
