import type { Metadata } from "next";
import { Button, TextLink } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "How this site was built",
  description:
    "The stack, the process and the AI-assisted workflow behind michaelprimak.ca — a working example of how I build.",
  alternates: { canonical: "/how-this-site-was-built" },
};

const stack = [
  ["Framework", "Next.js (App Router) with TypeScript, statically generated"],
  ["Styling", "Tailwind CSS with a small set of design tokens; light and dark themes"],
  ["Type", "Instrument Serif for display, Geist for text, Geist Mono for labels — self-hosted"],
  ["Content", "Plain TypeScript data files, so a text change is a one-line edit"],
  ["Contact form", "A server action with spam checks, delivering by email through Resend"],
  ["Live data", "The hero card reads real totals from the Good Fights API, refreshed hourly"],
  ["Hosting", "Vercel, deployed from GitHub — every push gets a preview URL"],
];

const process = [
  {
    title: "Brief first, code last",
    body: "Before anything was built: who the site is for (freelance clients first, employers second), what it has to say, and what the old site was missing. That brief drove every later decision.",
  },
  {
    title: "A real design mock, approved before coding",
    body: "The home page, a case study and the phone layout were mocked up and reviewed — including a deliberately different alternative — so the build started from a decision, not a guess.",
  },
  {
    title: "Vibe-coded, senior-reviewed",
    body: "The code was written with Claude Code from that mock, with me directing the work and reviewing every change. That's the same way I work on client projects: AI for pace, an experienced developer accountable for the result.",
  },
  {
    title: "Measured, not claimed",
    body: "Static pages, optimized images and fonts, semantic HTML and keyboard-friendly navigation. The site is checked against Lighthouse and accessibility tooling before each release.",
  },
];

export default function HowThisSiteWasBuiltPage() {
  return (
    <article className="wrap">
      <header className="pt-10 pb-10 sm:pt-16 sm:pb-14">
        <p className="mono mb-7">Behind the scenes</p>
        <h1 className="serif mb-5 text-[42px] leading-[1.04] sm:text-[66px]">How this site was built.</h1>
        <p className="serif max-w-[720px] text-[20px] text-ink2 sm:text-[24px]">
          A working example of the process I use for clients: a clear brief, a mock you approve, then a fast build
          with an experienced hand on every line.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-5 border-t border-line py-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12 lg:py-[72px]">
        <h2 className="serif text-[30px] leading-[1.1] sm:text-[34px]">The process</h2>
        <ol className="flex max-w-[640px] flex-col gap-8">
          {process.map((p, i) => (
            <li key={p.title} className="flex gap-5">
              <span className="serif mt-0.5 w-8 shrink-0 text-[32px] leading-none text-accent" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3 className="mb-1.5 text-[21px] leading-[1.2] font-medium">{p.title}</h3>
                <p className="text-ink2">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid grid-cols-1 gap-5 border-t border-line py-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12 lg:py-[72px]">
        <h2 className="serif text-[30px] leading-[1.1] sm:text-[34px]">The stack</h2>
        <dl className="max-w-[640px] border-t border-line">
          {stack.map(([k, v]) => (
            <div key={k} className="grid grid-cols-1 gap-1 border-b border-line py-4 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6">
              <dt className="mono pt-1">{k}</dt>
              <dd className="text-ink2">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="grid grid-cols-1 gap-5 border-t border-line py-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12 lg:py-[72px]">
        <h2 className="serif text-[30px] leading-[1.1] sm:text-[34px]">The code</h2>
        <div className="flex max-w-[640px] flex-col gap-4 text-ink2">
          <p>
            The whole site is open: the content files, the components, the contact form and the deployment setup.
            Have a look at how it’s put together.
          </p>
          <TextLink href={site.links.repo} external>
            View the source on GitHub
          </TextLink>
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-6 border-t border-line py-14 sm:flex-row sm:items-center">
        <h2 className="serif text-[32px] sm:text-[36px]">Want yours built this way?</h2>
        <Button href="/#contact">Start a project</Button>
      </div>
    </article>
  );
}
