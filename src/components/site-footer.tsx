import { nav, site } from "@/content/site";
import { SectionLink } from "./section-link";

const link = "text-ink2 hover:text-accent";

export function SiteFooter() {
  return (
    <div className="wrap">
      <footer className="flex flex-col items-start justify-between gap-6 border-t border-line pt-8 pb-12 text-sm text-ink3 sm:flex-row sm:items-center">
        <div>
          © {new Date().getFullYear()} {site.name} · {site.location}
        </div>
        <div className="flex flex-wrap gap-6">
          {/* The section links, minus Contact (it is right above the footer). */}
          {nav
            .filter((item) => item.href !== "/#contact")
            .map((item) => (
              <SectionLink key={item.href} href={item.href} className={link}>
                {item.label}
              </SectionLink>
            ))}
          <a href={site.resumePath} target="_blank" rel="noopener noreferrer" className={link}>
            Download Resume
          </a>
          <a href={site.links.github} target="_blank" rel="noopener noreferrer" className={link}>
            GitHub
          </a>
          <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className={link}>
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}
