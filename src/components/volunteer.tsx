import Image from "next/image";
import Link from "next/link";
import { volunteerProjects } from "@/content/projects";
import { experience, volunteer } from "@/content/site";
import { Eyebrow, Section, SectionHeading, TextLink } from "./ui";

/** Volunteer work (LGBT Voice Tanzania), laid out like the featured Projects card. */
export function Volunteer() {
  return (
    <Section id="volunteer">
      <Eyebrow label={volunteer.eyebrow} readId="volunteer" />
      <SectionHeading className="mb-9 sm:mb-14">{volunteer.heading}</SectionHeading>

      <div className="grid grid-cols-1 gap-7">
        {volunteerProjects.map((p) => {
          // The same logo tile as the project's row in Experience.
          const logo = experience.timeline.find((row) => row.org === p.title);
          const site = p.links[0];
          return (
            <article
              key={p.slug}
              className="grid grid-cols-1 items-center gap-7 rounded-3xl bg-bg2 p-7 sm:p-12 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-12"
            >
              <div className="text-center lg:text-left">
                {logo && (
                  <span
                    className="mx-auto flex h-28 w-56 items-center justify-center rounded-2xl border border-line bg-white p-3 lg:mx-0"
                    style={"logoBg" in logo ? { backgroundColor: logo.logoBg } : undefined}
                  >
                    <Image src={logo.logo} alt={`${p.title} logo`} width={400} height={200} sizes="224px" className="h-full w-full object-contain" />
                  </span>
                )}
              </div>
              <div className="text-center lg:text-left">
                <h3 className="serif mb-3.5 text-[32px] leading-[1.08] sm:text-[40px]">
                  <Link href={`/work/${p.slug}`} className="hover:text-accent">
                    {p.title}
                  </Link>
                </h3>
                <p className="mb-[22px] text-ink2">{p.summary}</p>
                <p className="mb-7 text-[15px] text-ink3">{p.kind}</p>
                <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 lg:justify-start">
                  <TextLink href={`/work/${p.slug}`}>Read the case study</TextLink>
                  {site && (
                    <TextLink href={site.href} external>
                      {site.label}
                    </TextLink>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
