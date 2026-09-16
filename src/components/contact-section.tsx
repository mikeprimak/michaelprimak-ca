import Image from "next/image";
import { contact, site } from "@/content/site";
import { ContactForm } from "./contact-form";
import { Eyebrow, Section, SectionHeading } from "./ui";

export function ContactSection() {
  return (
    <Section id="contact">
      <Eyebrow label={contact.eyebrow} />
      <SectionHeading className="mb-9 sm:mb-12">{contact.heading}</SectionHeading>
      {/* Email first, then the form under it. */}
      <div className="mx-auto flex w-full max-w-[680px] flex-col items-center gap-8" data-no-read>
        <div className="flex flex-col items-center gap-2 text-center">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-3 text-[19px] font-medium text-ink hover:text-accent sm:text-[21px]"
          >
            {/* Black envelope on transparent, so it inverts for dark mode. */}
            <Image src={contact.emailIcon} alt="" width={28} height={28} className="size-7 dark:invert" />
            <span className="border-b border-line pb-0.5">{site.email}</span>
          </a>
          <p className="mt-5 text-ink3 sm:mt-7 sm:mb-3">{contact.formLead}</p>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
