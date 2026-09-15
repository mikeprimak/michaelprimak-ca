import Image from "next/image";
import { hero, site } from "@/content/site";
import { techIcons } from "@/content/tech-icons";
import { Button } from "./ui";

export function Hero() {
  return (
    <div className="wrap" id="intro">
      {/* Photo on the left, everything else centred on the right — the layout of the
          original michaelprimak.ca. On phones the photo sits above the text. */}
      <div className="flex flex-col items-center gap-10 py-10 pb-16 lg:flex-row lg:justify-center lg:gap-20 lg:py-10 lg:pb-20">
        <Image
          src="/mike-primak.png"
          alt={`${site.name}, smiling`}
          width={1019}
          height={1131}
          priority
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 320px, 70vw"
          className="h-auto w-[70vw] max-w-[320px] shrink-0 lg:w-[380px] lg:max-w-none"
        />
        <div className="flex max-w-[600px] flex-col items-center text-center">
          <p className="mb-1.5 text-[19px] text-ink2 sm:text-[21px]">{hero.greeting}</p>
          <h1 className="serif mb-1.5 text-[48px] leading-[1.04] sm:text-[60px] lg:text-[66px]">{site.name}</h1>
          <p className="mb-7 text-[22px] text-ink2 sm:text-[26px]">{hero.title}</p>

          {/* One logo per technology, like the original site's row of icons. */}
          <ul className="mb-8 flex max-w-[520px] flex-wrap justify-center gap-x-5 gap-y-4" aria-label="Technologies I use">
            {techIcons.map((t) => (
              <li key={t.label} className="flex w-[68px] flex-col items-center gap-1.5">
                <svg viewBox="0 0 24 24" role="img" aria-hidden="true" className="size-9" fill={t.color}>
                  <path d={t.path} />
                </svg>
                <span className="text-[11px] leading-[1.2] text-ink3">{t.label}</span>
              </li>
            ))}
          </ul>

          {/* Both calls to action are the same size: a grid row stretches them to
              matching width and height, and the labels are allowed to wrap. */}
          <div className="grid w-full max-w-[460px] grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              href={hero.primaryCta.href}
              external
              arrow={false}
              className="h-auto min-h-[52px] justify-center py-3 text-center whitespace-normal"
            >
              {hero.primaryCta.label}
            </Button>
            <Button
              href={hero.secondaryCta.href}
              variant="outline"
              arrow={false}
              className="h-auto min-h-[52px] justify-center py-3 text-center whitespace-normal"
            >
              {hero.secondaryCta.label}
            </Button>
          </div>

          <ul className="mt-7 flex items-center justify-center gap-5">
            {hero.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`My ${s.label} profile`}
                  className="block rounded-full transition-opacity hover:opacity-70"
                >
                  {/* The icons are black on transparent, so they invert for dark mode. */}
                  <Image src={s.icon} alt="" width={40} height={40} className="size-10 dark:invert" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
