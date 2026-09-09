import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <div className="wrap">
      <footer className="flex flex-col items-start justify-between gap-6 border-t border-line pt-8 pb-12 text-sm text-ink3 sm:flex-row sm:items-center">
        <div>
          © {new Date().getFullYear()} {site.name} · {site.location}
        </div>
        <div className="flex flex-wrap gap-6">
          <a href={site.resumePath} target="_blank" rel="noopener noreferrer" className="text-ink2 hover:text-accent">
            Resume (PDF)
          </a>
          <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="text-ink2 hover:text-accent">
            GitHub
          </a>
          <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-ink2 hover:text-accent">
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}
