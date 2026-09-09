/**
 * Site-wide content. Edit text here — no component changes needed.
 * Anything in [square brackets] is a placeholder still to be filled in.
 */

export const site = {
  name: "Michael Primak",
  legalName: "Michael Primak",
  url: "https://michaelprimak.ca",
  title: "Michael Primak — Senior full-stack developer",
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
  resumePath: "/Michael-Primak-Resume.pdf",
  /** Reply-time promise shown next to the contact form. */
  replyTime: "one business day",
};

export const nav = [
  { label: "Selected work", href: "/#work" },
  { label: "Working style", href: "/#how" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export const hero = {
  eyebrow: "Senior full-stack developer · Ontario, Canada · Remote",
  headline: "I design, build and run products end to end.",
  lede: "Nine years shipping web and mobile products. Good Fights is the one I own end to end: apps on iOS and Android, a web app, the API behind them, and the scrapers, LLM enrichment and user input that keep it all current — 3,415 users and 76,516 ratings, on a platform I built and run myself.",
  primaryCta: { label: "See some of my work", href: "/#work" },
  secondaryCta: { label: "Open to senior full-stack roles", href: "/#contact" },
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
  heading: "If it can be built, I can build it.",
  intro:
    "Twenty years of writing code by hand, first as a hobbyist and then professionally, and now fully integrated with AI-assisted development. I own the whole ecosystem: the product, the code, the tests, the pipeline and the servers it runs on.",
  steps: [
    {
      title: "By hand, and with AI",
      body: "I learned to code long before there was a model to ask, so I can read, debug and design without one — and I use Claude Code every day because it makes a careful developer faster, not because it replaces one. Whatever the stack, the language or the shape of the problem, the answer is the same: it gets built, and it gets built properly.",
    },
    {
      title: "LLM features with guardrails",
      body: "Good Fights enriches its catalogue with Claude and gates every result on a confidence score, so nothing the model is unsure about reaches a user. There are unit tests that check the model's output — including one that verifies quoted material is real. The part that counts is the model running in production.",
    },
    {
      title: "Tested, and shipped by a pipeline",
      body: "Jest on the API — including tests that check what the model produced — type-checking and linting on every package, and more than 30 scheduled jobs, built as GitHub Actions workflows and now run from VPS cron, covering the scrapers, enrichment, database backups and content checks. Over-the-air updates push a fix to users without waiting on app-store review.",
    },
    {
      title: "I run the infrastructure",
      body: "A Docker-built API on Render, a Linux VPS where systemd and cron run the scrapers, the live trackers and the jobs that have to happen at 4am, Postgres with Prisma migrations, Cloudflare R2 for images, PostHog for what people actually do. No platform team behind me — when production breaks at 11pm, it's me.",
    },
  ],
  callout: {
    title: "This site is a working example.",
    body: "Designed and coded with Claude Code, with me reviewing every decision — statically generated, accessible, fast, and dark-mode aware. If you want to know how something here was built, ask me.",
  },
};

export type Role = "Developer" | "Coordinator";

export const experience = {
  heading: "Coder and coordinator, at small and mid-sized organizations.",
  intro:
    "I've written the code, sat with the customer, and run the team — which is why I'm comfortable being handed any of the three.",
  timeline: [
    {
      when: "Sept 2025 – now",
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
      when: "2018 – 2020",
      org: "WellnessLiving Systems Inc.",
      role: "White Label App Dept. Coordinator. Ran a team of developers, designers and support staff delivering white-label mobile apps to B2B clients.",
      type: "Coordinator" as Role,
    },
    {
      when: "2016 – 2025",
      org: "Fighting Tomatoes",
      role: "Web developer. Built and ran the interactive web app Good Fights grew out of — JavaScript, PHP, MySQL and Python, with accounts, ratings, comments and search.",
      type: "Developer" as Role,
    },
  ],
  education: [
    "Big Data Analytics, Georgian College",
    "Master of Osteopathic Sciences, Canadian Academy of Osteopathy",
    "BA Human Kinetics, Laurentian University",
  ],
};

export const contact = {
  heading: "Get in touch.",
  intro: `Hiring? Tell me about the role and the team. I reply within ${site.replyTime}.`,
  /** Placeholder in the message box. Written for hiring managers and recruiters as much as clients. */
  messagePlaceholder:
    "The role or project, what the team is working on, and anything you'd like me to know before we talk.",
};
