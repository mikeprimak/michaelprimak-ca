/**
 * Site-wide content. Edit text here - no component changes needed.
 * Anything in [square brackets] is a placeholder still to be filled in.
 */

export const site = {
  name: "Michael Primak",
  legalName: "Michael Primak",
  url: "https://michaelprimak.ca",
  title: "Michael Primak - Full-stack developer",
  description:
    "Full-stack developer in Ontario, Canada, building and shipping web and mobile products since 2016. React Native, TypeScript, Node and Postgres - shipped to the App Store and Google Play, with LLM features running in production.",
  location: "Ontario, Canada",
  email: "michaelsprimak@gmail.com",
  phone: "1-289-838-2575",
  links: {
    github: "https://github.com/mikeprimak",
    linkedin: "https://www.linkedin.com/in/michael-primak/",
    repo: "https://github.com/mikeprimak/michaelprimak-ca",
  },
  resumePath: "/Michael-Primak-Resume.pdf",
};

export const nav = [
  { label: "About Me", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#work" },
  { label: "Volunteer", href: "/#volunteer" },
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
  title: "Full-Stack Developer",
  tagline: "Ontario, Canada - Remote",
  headline: "I design, build, run and maintain software.",
  /** Opens the resume PDF in a new tab. */
  primaryCta: { label: "Download Resume", href: site.resumePath },
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
  /** One 4:5 photo beside the text (public/about-1.jpg, 800x1000). */
  photo: { src: "/about-1.jpg", alt: "Michael with his kids in the woods, looking at a mushroom" },
  cards: [
    { title: "Experience", lines: ["Building software since 2016"] },
    {
      title: "Education",
      /** "\n" is a deliberate break: credential on one line, subject on the next. */
      lines: ["College Diploma\nBig Data Analytics"],
    },
  ],
  paragraphs: [
    "I'm a software developer who helps companies build and improve their products. I can build new from scratch or upgrade an existing project. I can design, advise and code, and I work well as a solo developer or as a member of a team.",
    "I have worked for software companies in developer and coordinator roles, so I have experience with code, clients and managing a team. I have worked with a wide variety of projects and technologies, so I will be comfortable with any technology you require. My core competencies include web and mobile apps, APIs, web scrapers, LLM features, data flow, transformation & analysis. I am confident I can be the developer your team needs.",
  ],
};

export const work = {
  eyebrow: "An Example Of My",
  heading: "Full-Stack Mobile Development",
  intro:
    "Good Fights is an example of my full-stack mobile development work. I founded it and built every part of it, from the React Native apps to the API, database, AI enrichment and infrastructure.",
};

export const volunteer = {
  eyebrow: "How I Give Back",
  heading: "Volunteer",
};

export type Role = "Developer" | "Coordinator" | "Volunteer";

export const experience = {
  eyebrow: "See My",
  heading: "Experience",
  intro:
    "I've written code, interfaced with customers and coordinated the team, so I am comfortable in any of these roles.",
  timeline: [
    {
      when: "Sept 2025 – now",
      org: "Good Fights",
      logo: "/logos/good-fights.png",
      logoBg: "#181818",
      role: "I was the founder and sole developer, bringing this iOS and Android app to life. I am responsible for the full stack: React Native, TypeScript, Node, Next, Postgres, Prisma, Docker, AI enrichments and all infrastructure. A demonstration of my ability to execute every stage of app development.",
      type: "Developer" as Role,
    },
    {
      when: "2024 – now",
      org: "LGBT Voice Tanzania",
      logo: "/logos/lgbt-voice.png",
      role: "Volunteer. Re-built an old WordPress site using a modern WordPress framework. Made the website easier to maintain, nicer looking, and more comprehensive.",
      type: "Volunteer" as Role,
    },
    {
      when: "Apr 2024 – Nov 2024",
      org: "Zerion Software",
      logo: "/logos/zerion.png",
      role: "Implementation engineer. I worked with a small team of developers to build custom features for B2B clients. The product was a customizable data collection app. I was on calls with clients gathering requirements and writing custom code solutions.",
      type: "Developer" as Role,
    },
    {
      when: "2018 – 2020",
      org: "WellnessLiving Systems Inc.",
      logo: "/logos/wellnessliving.png",
      role: "I was the White Label App Department Coordinator. I coordinated a team of developers, designers and support staff delivering white-label mobile apps to B2B clients.",
      type: "Coordinator" as Role,
    },
    {
      when: "2016 – 2025",
      org: "Fighting Tomatoes",
      logo: "/logos/fighting-tomatoes.png",
      logoBg: "#181818",
      role: 'I built and ran the interactive web app "Fighting Tomatoes" out of vanilla JavaScript, PHP, CSS, MySQL and Python. Think Rotten Tomatoes for combat sports events. This evolved into the "Good Fights" mobile app.',
      type: "Developer" as Role,
    },
  ],
  education: ["Big Data Analytics, Georgian College"],
};

export const contact = {
  eyebrow: "Get in Touch",
  heading: "Contact Me",
  /** Just the email address in a bordered pill. */
};
