import Image from "next/image";
import { experience } from "@/content/site";
import { Eyebrow, Section, SectionHeading } from "./ui";

export function Experience() {
  return (
    <Section id="experience">
      <Eyebrow label={experience.eyebrow} readId="experience" />
      <SectionHeading intro={experience.intro}>{experience.heading}</SectionHeading>
      <ol className="border-t border-line">
        {experience.timeline.map((row, i) => (
          <li
            key={i}
            className="grid grid-cols-1 gap-2 border-b border-line py-[22px] sm:grid-cols-[150px_104px_minmax(0,1fr)_auto] sm:items-center sm:gap-6"
          >
            <span className="font-mono text-[13px] text-ink3">{row.when}</span>
            {/* Every logo is a 2:1 transparent tile (public/logos). White tile by default so dark
                wordmarks stay readable in dark mode; a row can set `logoBg` for its brand colour. */}
            <span
              className="flex h-[52px] w-[104px] items-center justify-center rounded-lg border border-line bg-white p-1.5"
              data-bounce
              style={"logoBg" in row ? { backgroundColor: row.logoBg } : undefined}
            >
              <Image src={row.logo} alt={`${row.org} logo`} width={400} height={200} sizes="104px" className="h-full w-full object-contain" />
            </span>
            <span className="text-xl">
              {row.org}
              <small className="mt-0.5 block text-[15px] text-ink2">{row.role}</small>
            </span>
            <span className="justify-self-start rounded-full border border-line px-2.5 py-1 font-mono text-[11.5px] tracking-[0.06em] whitespace-nowrap text-ink2 uppercase" data-bounce>
              {row.type}
            </span>
          </li>
        ))}
      </ol>
    </Section>
  );
}
