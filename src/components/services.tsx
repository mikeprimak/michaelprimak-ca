import { services } from "@/content/site";
import { Eyebrow, Section, SectionHeading } from "./ui";

export function Services() {
  return (
    <Section id="services">
      <Eyebrow number="04" label="Freelance" />
      <SectionHeading intro={services.intro}>{services.heading}</SectionHeading>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {services.items.map((s) => (
          <div key={s.title} className="flex flex-col gap-4 border-t border-ink pt-6">
            <h3 className="serif text-[28px] leading-[1.15]">{s.title}</h3>
            <p className="text-ink2">{s.body}</p>
            <p className="mt-auto pt-2 font-mono text-[13px] tracking-[0.02em] text-ink3">{s.stack}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
