import { contact, site } from "@/content/site";
import { ContactForm } from "./contact-form";
import { Eyebrow, Section, SectionHeading } from "./ui";

const directLink = "border-b border-line pb-0.5 text-ink hover:border-accent hover:text-accent";

export function ContactSection() {
  return (
    <Section id="contact">
      <Eyebrow label={contact.eyebrow} readId="contact" />
      <SectionHeading intro={contact.intro}>{contact.heading}</SectionHeading>
      {/* Heading on top, the form centred under it, the direct email under the form. */}
      <div className="mx-auto flex w-full max-w-[680px] flex-col items-center gap-8" data-no-read>
        <ContactForm />
        <div className="flex flex-col items-center gap-2.5 text-center">
          <span className="mono">Or email me directly at</span>
          <a href={`mailto:${site.email}`} className={directLink}>
            {site.email}
          </a>
        </div>
      </div>
    </Section>
  );
}
