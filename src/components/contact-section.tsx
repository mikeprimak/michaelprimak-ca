import { contact, site } from "@/content/site";
import { ContactForm } from "./contact-form";
import { Eyebrow, Section } from "./ui";

export function ContactSection() {
  return (
    <Section id="contact">
      <Eyebrow number="04" label="Contact" />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-7">
          <div>
            <h2 className="serif mb-5 text-[34px] leading-[1.08] sm:text-[46px]">{contact.heading}</h2>
            <p className="max-w-[620px] text-[17px] text-ink2 sm:text-[19px]">{contact.intro}</p>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="mono">Or reach me directly</span>
            <a href={`mailto:${site.email}`} className="self-start border-b border-line pb-0.5 text-ink hover:border-accent hover:text-accent">
              {site.email}
            </a>
            <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="self-start border-b border-line pb-0.5 text-ink hover:border-accent hover:text-accent">
              LinkedIn
            </a>
            <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="self-start border-b border-line pb-0.5 text-ink hover:border-accent hover:text-accent">
              GitHub
            </a>
          </div>
          <p className="text-[15px] text-ink2">{contact.hiringNote}</p>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
