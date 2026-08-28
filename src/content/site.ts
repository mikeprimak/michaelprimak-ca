/**
 * Site-wide content. Edit text here — no component changes needed.
 * Anything in [square brackets] is a placeholder still to be filled in.
 */

export const site = {
  name: "Mike Primak",
  legalName: "Michael Primak",
  url: "https://michaelprimak.ca",
  title: "Mike Primak — Freelance web & mobile developer",
  description:
    "I build and launch websites and mobile apps for small and mid-sized businesses. Senior developer, hands-on with both the code and the AI tools that make it faster.",
  location: "Ontario, Canada",
  email: "michaelsprimak@gmail.com",
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
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "How I work", href: "/#how" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export const hero = {
  eyebrow: "Freelance developer · Web & mobile",
  headline:
    "I build and launch websites and mobile apps for small and mid-sized businesses.",
  lede: "Senior developer, hands-on with both the code and the AI tools that make it faster. I've shipped commercial sites and iOS/Android apps, and led dev teams that had to work with designers and customer-facing staff — so I know how to get from idea to launched.",
  primaryCta: { label: "Start a project", href: "/#contact" },
  secondaryCta: { label: "Open to contracts and roles", href: "/#contact" },
};

export const services = {
  heading: "Three ways I can help.",
  intro:
    "Most clients need one of these. Some need all three at once — that's fine too.",
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

export const work = {
  heading: "Things I've shipped.",
  intro:
    "Real products, live today. Each one has a short write-up of what was built, what was hard, and what happened after launch.",
};

export const howIWork = {
  heading: "Manual and AI-assisted. Senior quality, faster.",
  intro:
    "I write code by hand and I use AI tools well. The result is the pace of a small team with one experienced person accountable for every line.",
  steps: [
    {
      title: "A short call, then a written scope",
      body: "We talk through what you need and who it's for. You get a plain-language scope with a fixed price or a clear estimate — no surprises later.",
    },
    {
      title: "Build in the open",
      body: "You get a preview link from the first week and see it improve as we go. Feedback goes straight into the next version.",
    },
    {
      title: "Launch, then hand you the keys",
      body: "I take it live, make sure it's fast and found by Google, and leave you able to update it — or keep me on for changes.",
    },
  ],
  callout: {
    title: "This site is a working example.",
    body: "Designed and coded with Claude Code, with me reviewing every decision. Fully static, accessible, and built for perfect Lighthouse scores. See what that looks like in practice.",
    cta: { label: "How this site was built", href: "/how-this-site-was-built" },
  },
};

export type Role = "Developer" | "Manager";

export const experience = {
  heading: "Coder and manager, at small and mid-sized organizations.",
  intro:
    "I've written the code and I've run the team — which is why I'm comfortable being handed either.",
  // TODO(Mike): replace the bracketed entries with real organizations, roles and years.
  timeline: [
    {
      when: "[Years]",
      org: "[Organization]",
      role: "[Role — one line on what you did]",
      type: "Manager" as Role,
    },
    {
      when: "[Years]",
      org: "[Organization]",
      role: "[Role — one line on what you did]",
      type: "Developer" as Role,
    },
    {
      when: "[Years]",
      org: "[Organization]",
      role: "[Role — one line on what you did]",
      type: "Developer" as Role,
    },
    {
      when: "[Year] – now",
      org: "Independent",
      role: "Freelance web & mobile development; founder of Good Fights",
      type: "Developer" as Role,
    },
  ],
  education:
    "BA Human Kinetics · College Diploma, Data Analytics · College Diploma, Osteopathy",
};

export const contact = {
  heading: "Start a project.",
  intro: `Tell me a little about what you need. I reply within ${site.replyTime}.`,
  hiringNote:
    "Hiring for a contract or an in-house role? Mention it in the form and I'll send a résumé.",
  projectTypes: [
    "Website",
    "Mobile app",
    "Website and mobile app",
    "Team lead / technical leadership",
    "Not sure yet",
  ],
};
