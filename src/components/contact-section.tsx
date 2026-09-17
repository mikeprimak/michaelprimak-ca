import Image from "next/image";
import { contact, site } from "@/content/site";
import { Eyebrow, Section, SectionHeading } from "./ui";

/** Envelope drawn with the text colour, so it follows light and dark mode. */
function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

const item = "inline-flex max-w-full items-center gap-3 text-[17px] font-medium text-ink hover:text-accent sm:text-[21px]";
const label = "border-b border-line pb-0.5";

export function ContactSection() {
  // Tall enough to fill the screen below the header, with the content centred, so jumping
  // to #contact lands with clear space above and below the pill.
  return (
    <Section id="contact" className="flex min-h-[calc(100svh-76px)] flex-col justify-center py-24 sm:py-32">
      <Eyebrow label={contact.eyebrow} />
      <SectionHeading className="mb-9 sm:mb-12">{contact.heading}</SectionHeading>
      {/* Email and LinkedIn side by side inside a bordered pill, as on the original site;
          they stack on narrow phones. */}
      <div className="mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-x-10 gap-y-5 rounded-[32px] border border-line bg-bg2 px-7 py-7 sm:px-12 sm:py-8" data-no-read>
        <a href={`mailto:${site.email}`} className={item}>
          <EnvelopeIcon />
          <span className={label}>{site.email}</span>
        </a>
        <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className={item}>
          {/* Black on transparent, so it inverts for dark mode. */}
          <Image src={contact.linkedinIcon} alt="" width={28} height={28} className="size-7 dark:invert" />
          <span className={label}>LinkedIn</span>
        </a>
      </div>
    </Section>
  );
}
