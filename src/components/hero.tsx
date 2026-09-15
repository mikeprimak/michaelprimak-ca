import Image from "next/image";
import { hero, site } from "@/content/site";
import { techIcons } from "@/content/tech-icons";
import { Button } from "./ui";

export function Hero() {
  return (
    <div className="wrap" id="intro">
      {/* Photo on the left, everything else centred on the right — the layout of the
          original michaelprimak.ca. On phones the photo sits above the text. */}
      {/* On desktop the block is vertically centred in the first screen (the header is 76px),
          like the original site's hero, so there is generous space above it. */}
      <div className="flex flex-col items-center gap-10 py-10 pb-16 lg:min-h-[calc(100svh-76px)] lg:flex-row lg:justify-center lg:gap-20 lg:py-16 lg:pb-24">
        <Image
          src="/mike-primak.png"
          alt={`${site.name}, smiling`}
          width={1019}
          height={1131}
          priority
          sizes="(min-width: 1024px) 340px, (min-width: 640px) 320px, 70vw"
          className="h-auto w-[70vw] max-w-[320px] shrink-0 lg:w-[340px] lg:max-w-none"
        />
        <div className="flex max-w-[600px] flex-col items-center text-center">
          <p className="mb-1.5 text-[19px] text-ink2">{hero.greeting}</p>
          <h1 className="serif mb-1.5 text-[44px] leading-[1.04] sm:text-[52px] lg:text-[56px]">{site.name}</h1>
          <p className="mb-2 text-[22px] text-ink2 sm:text-[23px]">{hero.title}</p>
          <p className="mb-7 text-[14px] text-ink3 sm:text-[15px]">{hero.tagline}</p>

          {/* One logo per technology, like the original site's row of icons. The name is
              in the tooltip and for screen readers only. */}
          <ul className="mb-8 grid grid-cols-9 gap-x-3 gap-y-3 sm:gap-x-4" aria-label="Technologies I use">
            {techIcons.map((t) => (
              <li key={t.label} title={t.label} className="flex justify-center">
                <svg viewBox="0 0 24 24" role="img" aria-label={t.label} className="size-6 sm:size-7" fill={t.color}>
                  <path d={t.path} />
                </svg>
              </li>
            ))}
          </ul>

          {/* Both calls to action are the same size: a grid row stretches them to
              matching width and height, and the labels are allowed to wrap. */}
          <div className="grid w-full max-w-[420px] grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              href={hero.primaryCta.href}
              external
              arrow={false}
              className="h-auto min-h-[48px] justify-center py-3 text-center text-[15px] whitespace-normal"
            >
              {hero.primaryCta.label}
            </Button>
            <Button
              href={hero.secondaryCta.href}
              variant="outline"
              arrow={false}
              className="h-auto min-h-[48px] justify-center py-3 text-center text-[15px] whitespace-normal"
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
                  <Image src={s.icon} alt="" width={36} height={36} className="size-9 dark:invert" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
