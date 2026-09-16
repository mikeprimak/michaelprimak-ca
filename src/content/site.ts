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
};

export const nav = [
  { label: "About Me", href: "/#about" },
  { label: "Projects", href: "/#work" },
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
  title: "Senior Software Developer",
  tagline: "Front-end, Back-end, End-to-end - Ontario, Canada - Remote",
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
  /** Three 4:5 photos shown in a row (public/about-*.jpg, 800x1000). */
  photos: [
    { src: "/about-1.jpg", alt: "Michael with his kids in the woods, looking at a mushroom" },
    { src: "/about-2.jpg", alt: "Michael and his child in the car on a winter day" },
    { src: "/about-3.jpg", alt: "Michael skating with his daughter on a frozen lake" },
  ],
  cards: [
    { title: "Experience", lines: ["8+ years software development."] },
    {
      title: "Education",
      lines: ["College Diploma - Big Data Analytics", "College Diploma - Osteopathy", "Bachelors Degree - Human Kinetics"],
    },
  ],
  paragraphs: [
    "I'm a programmer who helps companies build and improve their products. I can build new from scratch or upgrade an existing project, on the web, iOS and Android. I can design, advise and code, and I work well as a solo developer or as a member of a team.",
    "I have worked for software companies in developer and coordinator roles, so I have experience with code, clients and managing a team. I have worked with a wide variety of projects and technologies, so I will be comfortable with any technology you require. My core competencies include web and mobile apps, APIs, web scrapers, LLM features, data analysis and business websites. I am confident I can be the developer your team needs.",
  ],
};

export const work = {
  eyebrow: "Browse My Recent",
  heading: "Projects",
};

export type Role = "Developer" | "Coordinator";

export const experience = {
  eyebrow: "See My",
  heading: "Experience",
  intro:
    "I've written code, interfaced with customers, and coordinated the team — so I am comfortable in any of these roles.",
  timeline: [
    {
      when: "Sept 2025 – now",
      org: "Good Fights",
      logo: "/logos/good-fights.png",
      logoBg: "#181818",
      role: "I built and maintain the Good Fights app. It's on iOS, Android and Web, has thousands of real users and is updated daily by scrapers, LLM enrichment and an automated maintenance system. React Native, Node/TS, Postgres, Next.js.",
      type: "Developer" as Role,
    },
    {
      when: "2024 – now",
      org: "LGBT Voice Tanzania",
      logo: "/logos/lgbt-voice.png",
      role: "I redesigned and rebuilt their website using a modern WordPress framework so they can upload posts and make other changes easily.",
      type: "Developer" as Role,
    },
    {
      when: "Apr 2024 – Nov 2024",
      org: "Zerion Software",
      logo: "/logos/zerion.png",
      role: "I was an implementation engineer - adapting a mobile data-collection platform to individual client use cases. Talking to customers about what they were capturing, working out how the product should best receive and process it, then making the GUI and JavaScript changes to fit.",
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
  education: [
    "Big Data Analytics, Georgian College",
    "Master of Osteopathic Sciences, Canadian Academy of Osteopathy",
    "BA Human Kinetics, Laurentian University",
  ],
};

export const contact = {
  eyebrow: "Get in Touch",
  heading: "Contact Me",
  /** Email and LinkedIn side by side in a bordered pill, as on the original site. */
  linkedinIcon: "/icon-linkedin.png",
};
