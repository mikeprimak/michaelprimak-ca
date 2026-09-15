import Image from "next/image";
import { about } from "@/content/site";
import { Eyebrow, Section, SectionHeading } from "./ui";

/** "About Me" — three photos in a row, then the two fact cards and a short bio, all centred. */
export function About() {
  return (
    <Section id="about">
      <Eyebrow label={about.eyebrow} readId="about" />
      <SectionHeading className="mb-9 sm:mb-14">{about.heading}</SectionHeading>
      <div className="mx-auto mb-10 grid max-w-[900px] grid-cols-3 gap-3 sm:gap-5">
        {about.photos.map((p) => (
          <Image
            key={p.src}
            src={p.src}
            alt={p.alt}
            width={800}
            height={1000}
            sizes="(min-width: 900px) 290px, 30vw"
            className="aspect-[4/5] w-full rounded-2xl object-cover"
          />
        ))}
      </div>
      <div className="mx-auto flex max-w-[760px] flex-col gap-8">
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
        <div className="flex flex-col gap-4 text-center text-[17px] text-ink2">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}
