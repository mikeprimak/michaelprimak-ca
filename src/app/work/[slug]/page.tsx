import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GoodFightsArchitecture } from "@/components/architecture-diagram";
import { ListenButton } from "@/components/listen-button";
import { Button } from "@/components/ui";
import { PhoneFrames } from "@/components/work";
import { getProject, projects, type Project } from "@/content/projects";
import { fill, getLiveStats, type LiveStats } from "@/lib/good-fights";

// Re-render at most once an hour so the Good Fights numbers stay in step with production.
export const revalidate = 3600;

/** Fill `{stat}` tokens in every string of the project's copy. */
function withLiveNumbers(p: Project, stats: LiveStats): Project {
  const f = (s: string) => fill(s, stats);
  return {
    ...p,
    problem: p.problem.map(f),
    shipped: p.shipped.map(f),
    hardParts: p.hardParts.map((h) => ({ ...h, body: f(h.body) })),
    outcome: p.outcome.map((o) => ({ value: f(o.value), label: f(o.label) })),
  };
}

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.title} — case study`,
    description: project.deck,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: `${project.title} — case study`, description: project.deck, url: `/work/${project.slug}` },
  };
}

/** `wide` puts the heading above the content instead of in a side column, for
 *  content that needs the full width (the three-column "hard parts" grid). */
function Block({ heading, children, wide = false }: { heading: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div
      className={
        wide
          ? "flex flex-col gap-8 border-t border-line py-12 lg:py-[72px]"
          : "grid grid-cols-1 gap-5 border-t border-line py-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12 lg:py-[72px]"
      }
    >
      <h2 className="serif text-[30px] leading-[1.1] sm:text-[34px]">{heading}</h2>
      <div>{children}</div>
    </div>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const raw = getProject((await params).slug);
  if (!raw) notFound();
  const project = raw.architecture === "good-fights" ? withLiveNumbers(raw, await getLiveStats()) : raw;

  return (
    <article className="wrap page-enter" id="case-study">
      <nav aria-label="Breadcrumb" className="mt-8 flex items-center gap-2.5 sm:mt-12">
        <Link href="/#work" className="text-ink3 hover:text-accent">
          Work
        </Link>
        <span className="mono" aria-hidden="true">
          /
        </span>
        <span className="mono text-ink">{project.title}</span>
        <ListenButton targetId="case-study" className="ml-auto" />
      </nav>

      <header className="pt-6 pb-10 sm:pb-14">
        <h1 className="serif mb-4 text-[48px] leading-[1.02] sm:text-[76px]">{project.title}</h1>
        <p className="serif max-w-[720px] text-[20px] text-ink2 sm:text-[24px]">{project.deck}</p>
      </header>

      <dl className="grid grid-cols-1 gap-6 border-y border-line py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {project.meta.map((m) => (
          <div key={m.label} className="flex flex-col gap-2">
            <dt className="mono">{m.label}</dt>
            <dd className="text-[16px]">{m.value}</dd>
          </div>
        ))}
        {project.links.length > 0 && (
          <div className="flex flex-col gap-2">
            <dt className="mono">Links</dt>
            <dd className="text-[16px]">
              {project.links.map((l, i) => (
                <span key={l.href}>
                  {i > 0 && " · "}
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-h">
                    {l.label}
                  </a>
                </span>
              ))}
            </dd>
          </div>
        )}
      </dl>

      {/* Visual */}
      <div className="mt-14 flex justify-center rounded-3xl bg-bg2 p-7 sm:p-14">
        {project.screenshots.length > 0 ? (
          <div className="flex flex-wrap items-start justify-center gap-4">
            {project.screenshots.map((s) => (
              <Image
                key={s.src}
                src={s.src}
                alt={s.alt}
                width={s.width ?? (project.screenshotKind === "phone" ? 648 : 900)}
                height={s.height ?? (project.screenshotKind === "phone" ? 1440 : 560)}
                sizes={project.screenshotKind === "phone" ? "(min-width: 640px) 260px, 150px" : "(min-width: 900px) 900px, 100vw"}
                className={project.screenshotKind === "phone" ? "h-auto w-[150px] rounded-3xl sm:w-[260px]" : "h-auto w-full max-w-[900px] rounded-xl"}
              />
            ))}
          </div>
        ) : project.screenshotKind === "phone" ? (
          <PhoneFrames tall />
        ) : project.image?.kind === "logo" || project.image?.kind === "artwork" ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={360}
            height={360}
            sizes="(min-width: 640px) 360px, 240px"
            // Keep the class list as plain strings: Tailwind ignores a class glued to a ${} expression.
            className={["size-60 rounded-xl object-contain sm:size-[360px]", project.image.kind === "logo" ? "mix-blend-multiply dark:mix-blend-normal" : ""].join(" ")}
          />
        ) : (
          <div
            className="flex h-[240px] w-full max-w-[900px] items-center justify-center rounded-2xl border border-dashed border-ink3 font-mono text-[12.5px] tracking-[0.06em] text-ink3 uppercase sm:h-[420px]"
            aria-hidden="true"
          >
            Screenshot
          </div>
        )}
      </div>

      <div className="mt-14">
        <Block heading="The problem">
          <div className="flex max-w-[640px] flex-col gap-[18px] text-[18px] text-ink2">
            {project.problem.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Block>

        <Block heading="What shipped">
          <ul className="flex max-w-[640px] list-disc flex-col gap-2.5 pl-5 text-[18px] text-ink2">
            {project.shipped.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Block>

        {project.architecture === "good-fights" && (
          <Block heading="How it fits together">
            <GoodFightsArchitecture />
          </Block>
        )}

        <Block heading="The hard parts" wide>
          {/* Full width, a title that scales down on narrow phones, and a length cap in
              projects.ts (MAX_HARD_PART_TITLE) so each heading always fits on one line. */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {project.hardParts.map((h) => (
              <div key={h.title} className="flex flex-col gap-2.5 border-t border-ink pt-5">
                <h3 className="text-[clamp(16px,4.6vw,20px)] leading-[1.2] font-medium whitespace-nowrap md:text-[20px]">{h.title}</h3>
                <p className="text-[16px] text-ink2">{h.body}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block heading="Outcome">
          {project.outcomeKind === "quote" ? (
            <figure className="max-w-[42ch]">
              {project.outcome.map((o) => (
                <div key={o.label}>
                  <blockquote className="serif text-[28px] leading-[1.25] sm:text-[34px]">
                    {o.value}
                  </blockquote>
                  <figcaption className="mt-3 text-sm text-ink3">{o.label}</figcaption>
                </div>
              ))}
            </figure>
          ) : (
            <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {project.outcome.map((o) => (
                <div key={o.label}>
                  <dd className="serif mb-2 text-[40px] leading-none sm:text-[52px]">{o.value}</dd>
                  <dt className="text-sm text-ink3">{o.label}</dt>
                </div>
              ))}
            </dl>
          )}
        </Block>

        <div className="flex flex-col items-start justify-between gap-6 border-t border-line py-14 sm:flex-row sm:items-center">
          <h2 className="serif text-[32px] sm:text-[36px]">Looking for someone who builds like this?</h2>
          <Button href="/#contact">Get in touch</Button>
        </div>
      </div>
    </article>
  );
}
