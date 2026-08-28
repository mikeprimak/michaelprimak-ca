import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GoodFightsArchitecture } from "@/components/architecture-diagram";
import { Button } from "@/components/ui";
import { PhoneFrames } from "@/components/work";
import { getProject, projects } from "@/content/projects";

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

function Block({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-5 border-t border-line py-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12 lg:py-[72px]">
      <h2 className="serif text-[30px] leading-[1.1] sm:text-[34px]">{heading}</h2>
      <div>{children}</div>
    </div>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  return (
    <article className="wrap">
      <nav aria-label="Breadcrumb" className="mt-8 flex items-center gap-2.5 sm:mt-12">
        <Link href="/#work" className="text-ink3 hover:text-accent">
          Work
        </Link>
        <span className="mono" aria-hidden="true">
          /
        </span>
        <span className="mono text-ink">{project.title}</span>
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
                width={project.screenshotKind === "phone" ? 260 : 900}
                height={project.screenshotKind === "phone" ? 560 : 560}
                className={project.screenshotKind === "phone" ? "w-[150px] rounded-3xl sm:w-[260px]" : "w-full max-w-[900px] rounded-xl"}
              />
            ))}
          </div>
        ) : project.screenshotKind === "phone" ? (
          <PhoneFrames tall />
        ) : project.image?.kind === "logo" ? (
          <Image src={project.image.src} alt={project.image.alt} width={240} height={240} className="size-40 rounded-xl mix-blend-multiply sm:size-60 dark:mix-blend-normal" />
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

        <Block heading="The hard parts">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {project.hardParts.map((h) => (
              <div key={h.title} className="flex flex-col gap-2.5 border-t border-ink pt-5">
                <h3 className="text-[21px] leading-[1.2] font-medium">{h.title}</h3>
                <p className="text-[16px] text-ink2">{h.body}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block heading="Outcome">
          <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {project.outcome.map((o) => (
              <div key={o.label}>
                <dd className="serif mb-2 text-[40px] leading-none sm:text-[52px]">{o.value}</dd>
                <dt className="text-sm text-ink3">{o.label}</dt>
              </div>
            ))}
          </dl>
        </Block>

        <div className="flex flex-col items-start justify-between gap-6 border-t border-line py-14 sm:flex-row sm:items-center">
          <h2 className="serif text-[32px] sm:text-[36px]">Have something like this in mind?</h2>
          <Button href="/#contact">Start a project</Button>
        </div>
      </div>
    </article>
  );
}
