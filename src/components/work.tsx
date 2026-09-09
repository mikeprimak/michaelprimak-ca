import Image from "next/image";
import Link from "next/link";
import { featuredProject, otherProjects, type Project } from "@/content/projects";
import { work } from "@/content/site";
import { Eyebrow, Section, SectionHeading, TextLink } from "./ui";

export function PhoneFrames({ tall = false }: { tall?: boolean }) {
  // Placeholder frames until real screenshots are added to the project data.
  return (
    <div className="flex items-end justify-center gap-2.5 sm:gap-4" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`flex w-24 items-center justify-center rounded-3xl border border-dashed border-ink3 bg-bg3 p-3 text-center font-mono text-[11px] tracking-[0.06em] text-ink3 uppercase sm:w-[150px] ${
            i === 1 || tall ? "h-[220px] sm:h-[340px]" : "h-[200px] sm:h-[300px]"
          }`}
        >
          Screenshot
        </div>
      ))}
    </div>
  );
}

function FeaturedShots({ project }: { project: Project }) {
  if (project.screenshots.length === 0) return <PhoneFrames />;
  const phone = project.screenshotKind === "phone";
  return (
    <div className="flex items-end justify-center gap-2.5 sm:gap-4">
      {project.screenshots.map((s) => (
        <Image
          key={s.src}
          src={s.src}
          alt={s.alt}
          width={s.width ?? (phone ? 648 : 900)}
          height={s.height ?? (phone ? 1440 : 560)}
          sizes={phone ? "(min-width: 640px) 150px, 96px" : "(min-width: 640px) 460px, 100vw"}
          className={phone ? "h-auto w-24 rounded-2xl sm:w-[150px]" : "h-auto w-full rounded-xl"}
        />
      ))}
    </div>
  );
}

function Thumb({ project }: { project: Project }) {
  const shot = project.screenshots[0];
  if (shot) {
    return (
      <div className="h-[190px] overflow-hidden rounded-2xl bg-bg2">
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width ?? 900}
          height={shot.height ?? 560}
          sizes="(min-width: 768px) 380px, 100vw"
          className="size-full object-cover object-top"
        />
      </div>
    );
  }
  if (project.image?.kind === "logo" || project.image?.kind === "artwork") {
    // Blending only suits logos drawn on white; it turns artwork muddy in light mode.
    const blend = project.image.kind === "logo" ? " mix-blend-multiply dark:mix-blend-normal" : "";
    return (
      <div className="flex h-[190px] items-center justify-center rounded-2xl bg-bg2 p-8">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={160}
          height={160}
          className={`max-h-full w-auto max-w-[180px] rounded-lg dark:rounded-xl${blend}`}
        />
      </div>
    );
  }
  return (
    <div
      className="flex h-[190px] items-center justify-center rounded-2xl border border-dashed border-ink3 p-4 text-center font-mono text-[12.5px] tracking-[0.06em] text-ink3 uppercase"
      aria-hidden="true"
    >
      Screenshot — {project.title}
    </div>
  );
}

export function Work() {
  const f = featuredProject;
  return (
    <Section id="work">
      <Eyebrow number="01" label="Selected work" readId="work" />
      <SectionHeading intro={work.intro}>{work.heading}</SectionHeading>

      {/* Featured */}
      <div className="mb-7 grid grid-cols-1 items-center gap-7 rounded-3xl bg-bg2 p-7 sm:p-12 lg:grid-cols-2 lg:gap-12">
        <div>
          {f.image && (
            <Image
              src={f.image.src}
              alt={f.image.alt}
              width={56}
              height={56}
              className="mb-[22px] size-14 rounded-[14px]"
            />
          )}
          <h3 className="serif mb-3.5 text-[32px] leading-[1.08] sm:text-[40px]">
            <Link href={`/work/${f.slug}`} className="hover:text-accent">
              {f.title}
            </Link>
          </h3>
          <p className="mb-[22px] text-ink2">{f.summary}</p>
          <ul className="mb-7 flex flex-wrap gap-2">
            {f.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-line px-2.5 py-1.5 font-mono text-[12px] tracking-[0.03em] text-ink2"
              >
                {t}
              </li>
            ))}
          </ul>
          <TextLink href={`/work/${f.slug}`}>Read the case study</TextLink>
        </div>
        <FeaturedShots project={f} />
      </div>

      {/* Others */}
      <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
        {otherProjects.map((p) => (
          <article key={p.slug} className="flex flex-col gap-3.5">
            <Link href={`/work/${p.slug}`} aria-hidden="true" tabIndex={-1}>
              <Thumb project={p} />
            </Link>
            <h3 className="serif mt-2 text-2xl leading-[1.15]">
              <Link href={`/work/${p.slug}`} className="hover:text-accent">
                {p.title}
              </Link>
            </h3>
            <p className="text-[16px] text-ink2">{p.summary}</p>
            <div className="flex items-center justify-between gap-4 text-[13px] text-ink3">
              <span>{p.kind}</span>
              <TextLink href={`/work/${p.slug}`} className="text-[15px]">
                Case study
              </TextLink>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
