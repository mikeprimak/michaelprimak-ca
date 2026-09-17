import Image from "next/image";
import { about } from "@/content/site";
import { Eyebrow, Section, SectionHeading } from "./ui";

/** "About Me" — one photo on the left, the two fact cards and the bio on the right.
 *  On phones the photo sits above the text. */
export function About() {
  return (
    <Section id="about">
      <Eyebrow label={about.eyebrow} readId="about" />
      <SectionHeading className="mb-9 sm:mb-14">{about.heading}</SectionHeading>
      <div className="mx-auto grid max-w-[1040px] grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Image
          src={about.photo.src}
          alt={about.photo.alt}
          width={800}
          height={1000}
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 360px, 80vw"
          className="mx-auto aspect-[4/5] w-full max-w-[360px] rounded-3xl object-cover lg:max-w-none"
        />
        <div className="flex flex-col gap-8">
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
