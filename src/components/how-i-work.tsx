import { howIWork } from "@/content/site";
import { Eyebrow, Section, SectionHeading } from "./ui";

export function HowIWork() {
  return (
    <Section id="how">
      <Eyebrow label={howIWork.eyebrow} readId="how" />
      <SectionHeading intro={howIWork.intro}>{howIWork.heading}</SectionHeading>
      <ol className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {howIWork.steps.map((s, i) => (
          <li key={s.title} className="flex flex-col gap-3">
            <span className="serif text-[44px] leading-none text-accent" aria-hidden="true">
              {i + 1}
            </span>
            <h3 className="text-2xl leading-[1.2] font-medium">{s.title}</h3>
            <p className="text-ink2">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
