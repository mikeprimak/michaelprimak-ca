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
  { label: "About Me", href: "/#about" },
  { label: "Projects", href: "/#work" },
  { label: "Working style", href: "/#how" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

/**
 * Above-the-fold intro. Laid out like the original michaelprimak.ca: photo on the left,
 * greeting / name / title, a logo per technology (src/content/tech-icons.ts), two buttons
 * and the social icons on the right.
 * `headline` is kept for the Open Graph share image (src/app/opengraph-image.tsx).
 */
export const hero = {
  greeting: "Hello, I'm",
  title: "Software Developer",
  headline: "I design, build, run and maintain software.",
  /** Opens the resume PDF in a new tab. */
  primaryCta: { label: "Download CV", href: site.resumePath },
  secondaryCta: { label: "Contact Info", href: "/#contact" },
  socials: [
    { label: "LinkedIn", href: site.links.linkedin, icon: "/icon-linkedin.png" },
    { label: "GitHub", href: site.links.github, icon: "/icon-github.png" },
  ],
};

/** Section lead-ins and titles follow the original site: "Get To Know More" / "About Me", and so on. */
export const about = {
  eyebrow: "Get To Know More",
  heading: "About Me",
  cards: [
    { title: "Experience", lines: ["8+ years software development - working with code, colleagues and customers."] },
    {
      title: "Education",
      lines: ["College Diploma - Big Data Analytics", "College Diploma - Osteopathy", "Bachelors Degree - Human Kinetics"],
    },
  ],
  paragraphs: [
    "I'm a software developer who helps companies build and improve their products. I can build new from scratch or upgrade an existing project, on the web, iOS and Android. I can design, advise and code, and I work well as a solo developer or as a member of a team.",
    "I have worked for software companies in developer and coordinator roles, so I have experience with code, clients and managing a team. I have worked with a wide variety of projects and technologies, so I will be comfortable with any technology you require. My core competencies include web and mobile apps, APIs, web scrapers, LLM features, data analysis and business websites. I am confident I can be the developer your team needs.",
  ],
};

export const work = {
  eyebrow: "Browse My Recent",
  heading: "Projects",
};

export const howIWork = {
  eyebrow: "Learn About My",
  heading: "Working Style",
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
};

export type Role = "Developer" | "Coordinator";

export const experience = {
  eyebrow: "Explore My",
  heading: "Experience",
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
  eyebrow: "Get in Touch",
  heading: "Contact Me",
  intro: `Hiring? Tell me about the role and the team. I reply within ${site.replyTime}.`,
  /** Placeholder in the message box. Written for hiring managers and recruiters as much as clients. */
  messagePlaceholder:
    "The role or project, what the team is working on, and anything you'd like me to know before we talk.",
};
