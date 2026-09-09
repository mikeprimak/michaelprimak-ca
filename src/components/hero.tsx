import Image from "next/image";
import { hero, site } from "@/content/site";
import { fill, getLiveStats, type LiveStats } from "@/lib/good-fights";
import { Button } from "./ui";
import { ListenButton } from "./listen-button";

const fmt = new Intl.NumberFormat("en-CA");

function LiveCard({ stats }: { stats: LiveStats }) {
  return (
    <div className="relative flex w-full max-w-[400px] flex-col gap-3.5 rounded-2xl border border-line bg-bg2 px-[22px] py-5">
      {/* App icon sits in the card's top-right corner; the label wraps beside it. */}
      <Image
        src="/good-fights-icon.png"
        alt="Good Fights app icon"
        width={44}
        height={44}
        className="absolute top-3.5 right-3.5 size-11 rounded-[10px]"
      />
      <span className="mono flex min-h-11 items-center pr-14 leading-[1.5]">
        <span
          aria-hidden="true"
          className="mr-2 inline-block size-2 shrink-0 rounded-full bg-[#2f9e5b] shadow-[0_0_0_3px_rgba(47,158,91,0.18)]"
        />
        {stats.live ? "Live data from one of my projects" : "Data from one of my projects"}
      </span>
      <dl className="grid grid-cols-2 gap-3.5">
        <div>
          <dd className="serif mb-1.5 text-[34px] leading-none">{fmt.format(stats.fightsInApp)}</dd>
          <dt className="text-[13px] text-ink3">fights covered</dt>
        </div>
        <div>
          <dd className="serif mb-1.5 text-[34px] leading-none">{fmt.format(stats.totalRatings)}</dd>
          <dt className="text-[13px] text-ink3">user ratings</dt>
        </div>
      </dl>
      <p className="text-[15px] text-ink2">
        Real numbers from Good Fights, an app I built and run. {stats.live ? "Updated hourly." : "Last known values."}
      </p>
    </div>
  );
}

export async function Hero() {
  const stats = await getLiveStats();
  return (
    <div className="wrap" id="intro">
      <div className="grid grid-cols-1 items-center gap-10 py-10 pb-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-[72px] lg:py-[88px] lg:pb-24">
        <div>
          <div className="mb-7 flex flex-wrap items-center gap-3.5">
            <p className="mono">
              {hero.eyebrow}
              <span aria-hidden="true"> · </span>
              <a
                href={site.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink2 underline decoration-line underline-offset-4 transition-colors hover:text-accent"
                data-no-read
              >
                Download resume
              </a>
            </p>
            <ListenButton targetId="intro" className="ml-auto" />
          </div>
          <h1 className="serif mb-7 text-[42px] leading-[1.04] sm:text-[56px] lg:text-[66px]">
            {hero.headline}
          </h1>
          <p className="mb-9 max-w-[560px] text-[17px] text-ink2 sm:text-[19px]">{fill(hero.lede, stats)}</p>
          {/* Both calls to action are the same size: a grid row stretches them to
              matching width and height, and the labels are allowed to wrap. */}
          <div className="grid max-w-[640px] grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              href={hero.primaryCta.href}
              className="h-auto min-h-[52px] justify-center py-3 text-center whitespace-normal"
            >
              {hero.primaryCta.label}
            </Button>
            <Button
              href={hero.secondaryCta.href}
              variant="outline"
              className="h-auto min-h-[52px] justify-center py-3 text-center whitespace-normal"
            >
              {hero.secondaryCta.label}
            </Button>
          </div>
          <ul className="mt-9 flex max-w-[560px] flex-wrap gap-x-2.5 gap-y-2">
            {hero.stack.map((s) => (
              <li
                key={s}
                className="rounded-full border border-line px-3 py-1 font-mono text-[12.5px] tracking-[0.02em] text-ink2"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-start gap-5 lg:items-end">
          {/* The photo is narrower than the live card, so it centres over the card
              rather than hanging off one edge of it. */}
          <div className="flex w-full max-w-[400px] flex-col items-center gap-5">
            <Image
              src="/mike-primak.png"
              alt={`${site.name}, smiling`}
              width={1019}
              height={1131}
              priority
              sizes="(min-width: 1024px) 264px, (min-width: 640px) 240px, 70vw"
              className="h-auto w-[70vw] max-w-[320px] sm:w-60 lg:w-[264px]"
            />
            <LiveCard stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
}
