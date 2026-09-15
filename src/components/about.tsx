import Image from "next/image";
import { about, site } from "@/content/site";
import { Eyebrow, Section, SectionHeading } from "./ui";

/** "About Me" — photo on the left, two fact cards and a short bio on the right, as on the original site. */
export function About() {
  return (
    <Section id="about">
      <Eyebrow label={about.eyebrow} readId="about" />
      <SectionHeading className="mb-9 sm:mb-14">{about.heading}</SectionHeading>
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center lg:gap-16">
        <Image
          src="/mike-and-daughter.png"
          alt={`${site.name} with his daughter`}
          width={1462}
          height={1949}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 320px, 80vw"
          className="h-auto w-[80vw] max-w-[320px] shrink-0 rounded-3xl object-cover lg:w-[360px] lg:max-w-none"
        />
        <div className="flex max-w-[640px] flex-col gap-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {about.cards.map((c) => (
              <div key={c.title} className="rounded-2xl border border-line bg-bg2 px-6 py-6 text-center">
                <h3 className="mb-2 text-xl font-medium">{c.title}</h3>
                <ul className="flex flex-col gap-1 text-[15px] text-ink2">
                  {c.lines.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 text-center text-[17px] text-ink2 lg:text-left">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
