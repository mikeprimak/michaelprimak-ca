import { experience, site } from "@/content/site";
import { Eyebrow, Section, SectionHeading, TextLink } from "./ui";

export function Experience() {
  return (
    <Section id="experience">
      <Eyebrow number="03" label="Experience" />
      <SectionHeading intro={experience.intro}>{experience.heading}</SectionHeading>
      <ol className="border-t border-line">
        {experience.timeline.map((row, i) => (
          <li
            key={i}
            className="grid grid-cols-1 gap-2 border-b border-line py-[22px] sm:grid-cols-[150px_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6"
          >
            <span className="font-mono text-[13px] text-ink3">{row.when}</span>
            <span className="text-xl">
              {row.org}
              <small className="mt-0.5 block text-[15px] text-ink2">{row.role}</small>
            </span>
            <span
              className={`justify-self-start rounded-full border px-2.5 py-1 font-mono text-[11.5px] tracking-[0.06em] whitespace-nowrap uppercase ${
                row.type === "Manager" ? "border-accent text-accent" : "border-line text-ink2"
              }`}
            >
              {row.type}
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-10 flex flex-wrap gap-10">
        <div className="flex flex-col gap-1.5">
          <span className="mono">Education</span>
          <ul className="flex flex-col gap-1">
            {experience.education.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="mono">Résumé</span>
          <TextLink href={site.resumePath} external>
            Download PDF
          </TextLink>
        </div>
      </div>
    </Section>
  );
}
