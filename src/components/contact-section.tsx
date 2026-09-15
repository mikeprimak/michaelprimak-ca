import { contact, site } from "@/content/site";
import { ContactForm } from "./contact-form";
import { Eyebrow, Section, SectionHeading } from "./ui";

export function ContactSection() {
  return (
    <Section id="contact">
      <Eyebrow label={contact.eyebrow} readId="contact" />
      <SectionHeading className="mb-9 sm:mb-12">{contact.heading}</SectionHeading>
      {/* Email first, then the form under it. */}
      <div className="mx-auto flex w-full max-w-[680px] flex-col items-center gap-8" data-no-read>
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-[19px] sm:text-[21px]">
            <span className="text-ink2">{contact.emailLabel}</span>{" "}
            <a
              href={`mailto:${site.email}`}
              className="border-b border-line pb-0.5 font-medium text-ink hover:border-accent hover:text-accent"
            >
              {site.email}
            </a>
          </p>
          <p className="mt-5 text-ink3 sm:mt-7 sm:mb-3">{contact.formLead}</p>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
