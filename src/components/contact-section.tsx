import { contact, site } from "@/content/site";
import { ContactForm } from "./contact-form";
import { Eyebrow, Section } from "./ui";

const directLink =
  "self-start border-b border-line pb-0.5 text-ink hover:border-accent hover:text-accent";

export function ContactSection() {
  return (
    <Section id="contact">
      <Eyebrow number="04" label="Contact" readId="contact" />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-7">
          <div>
            <h2 className="serif mb-5 text-[34px] leading-[1.08] sm:text-[46px]">{contact.heading}</h2>
            <p className="max-w-[620px] text-[17px] text-ink2 sm:text-[19px]">{contact.intro}</p>
          </div>
        </div>
        {/* The form comes first; the direct links sit under it on every screen size. */}
        <div className="flex flex-col gap-8" data-no-read>
          <ContactForm />
          <div className="flex flex-col gap-2.5">
            <span className="mono">Or email me directly at</span>
            <a href={`mailto:${site.email}`} className={directLink}>
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
