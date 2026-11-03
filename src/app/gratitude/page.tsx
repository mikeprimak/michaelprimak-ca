import type { Metadata } from "next";
import { Eyebrow, SectionHeading, TextLink } from "@/components/ui";
import { gratitude, organizations, organizationsIntro, people, type Thanks } from "@/content/gratitude";

export const metadata: Metadata = {
  title: "Gratitude",
  description: "The people and organizations who helped Michael Primak and his family along the way.",
  alternates: { canonical: "/gratitude" },
};

function ThanksCard({ t }: { t: Thanks }) {
  return (
    <article className="flex flex-col rounded-3xl bg-bg2 p-7 sm:p-10">
      <h3 className="serif text-[26px] leading-[1.1] sm:text-[30px]">{t.name}</h3>
      {t.context && <p className="mt-1.5 text-[15px] text-ink3">{t.context}</p>}
      <p className="mt-5 text-ink2">{t.story}</p>
      {t.link && (
        <div className="mt-6">
          <TextLink href={t.link.href} external>
            {t.link.label}
          </TextLink>
        </div>
      )}
    </article>
  );
}

function Group({ title, intro, items }: { title: string; intro?: string; items: Thanks[] }) {
  if (items.length === 0) return null;
  return (
    <section className="border-t border-line py-12 sm:py-16">
      <h2 className="serif mb-4 text-center text-[28px] leading-[1.1] sm:text-[32px]">{title}</h2>
      {intro && <p className="mx-auto mb-9 max-w-[620px] text-center text-ink2">{intro}</p>}
      <div className={`grid grid-cols-1 gap-6 ${items.length > 1 ? "md:grid-cols-2" : "mx-auto max-w-[760px]"}`}>
        {items.map((t) => (
          <ThanksCard key={t.name} t={t} />
        ))}
      </div>
    </section>
  );
}

export default function GratitudePage() {
  return (
    <div className="wrap pt-12 pb-16 sm:pt-20">
      <Eyebrow label={gratitude.eyebrow} />
      <SectionHeading intro={gratitude.intro}>{gratitude.heading}</SectionHeading>
      <Group title="People" items={people} />
      <Group title="Organizations" intro={organizationsIntro} items={organizations} />
    </div>
  );
}
