import { howIWork } from "@/content/site";
import { Eyebrow, Section, SectionHeading } from "./ui";

export function HowIWork() {
  return (
    <Section id="how">
      <Eyebrow number="02" label="Working style" readId="how" />
      <SectionHeading intro={howIWork.intro}>{howIWork.heading}</SectionHeading>
      <ol className="mb-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
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
      <div className="rounded-3xl bg-ink px-7 py-7 text-bg sm:px-12 sm:py-10">
        <h3 className="serif mb-2.5 text-[28px] leading-[1.15] sm:text-[32px]">{howIWork.callout.title}</h3>
        <p className="max-w-[720px] opacity-75">{howIWork.callout.body}</p>
      </div>
    </Section>
  );
}
