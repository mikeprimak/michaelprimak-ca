import Image from "next/image";
import Link from "next/link";
import { featuredProject, otherProjects, type Project } from "@/content/projects";
import { experience, work } from "@/content/site";
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
    const blend = project.image.kind === "logo" ? "mix-blend-multiply dark:mix-blend-normal" : "";
    return (
      <div className="flex h-[220px] items-center justify-center rounded-2xl bg-bg2 p-6">
        {/* Fixed square so every logo reads the same size regardless of its own proportions. */}
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={240}
          height={240}
          sizes="160px"
          className={["size-40 rounded-lg object-contain dark:rounded-xl", blend].join(" ")}
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
  // The featured card shows the same logo tile as the project's row in Experience.
  const logo = experience.timeline.find((row) => row.org === f.title);
  return (
    <Section id="work">
      <Eyebrow label={work.eyebrow} readId="work" />
      <SectionHeading className="mb-9 sm:mb-14">{work.heading}</SectionHeading>

      {/* Featured */}
      <div className="mb-7 grid grid-cols-1 items-center gap-7 rounded-3xl bg-bg2 p-7 sm:p-12 lg:grid-cols-2 lg:gap-12">
        {/* The same wordmark tile as the Experience section, centred on phones. */}
        <div className="text-center sm:text-left">
          {logo && (
            <span
              className="mx-auto mb-[22px] flex h-28 w-56 items-center justify-center rounded-2xl bg-white p-3 sm:mx-0 sm:h-[88px] sm:w-44"
              data-bounce
              style={"logoBg" in logo ? { backgroundColor: logo.logoBg } : undefined}
            >
              <Image src={logo.logo} alt={`${f.title} logo`} width={400} height={200} sizes="224px" className="h-full w-full object-contain" />
            </span>
          )}
          <h3 className="serif mb-3.5 text-[32px] leading-[1.08] sm:text-[40px]">
            <Link href={`/work/${f.slug}`} className="hover:text-accent">
              {f.title}
            </Link>
          </h3>
          <p className="mb-[22px] text-ink2">{f.summary}</p>
          <p className="mb-7 text-[15px] text-ink3">{f.kind}</p>
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
