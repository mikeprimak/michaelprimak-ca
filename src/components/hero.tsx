import Image from "next/image";
import { hero, site } from "@/content/site";
import { getLiveStats } from "@/lib/good-fights";
import { Button, TextLink } from "./ui";

const fmt = new Intl.NumberFormat("en-CA");

async function LiveCard() {
  const stats = await getLiveStats();
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-3.5 rounded-2xl border border-line bg-bg2 px-[22px] py-5">
      <div className="flex items-center justify-between gap-3">
        <span className="mono flex items-center">
          <span
            aria-hidden="true"
            className="mr-2 inline-block size-2 rounded-full bg-[#2f9e5b] shadow-[0_0_0_3px_rgba(47,158,91,0.18)]"
          />
          {stats.live ? "Live from production" : "From production"}
        </span>
        <span className="mono">Good Fights API</span>
      </div>
      <dl className="grid grid-cols-2 gap-3.5">
        <div>
          <dd className="serif mb-1.5 text-[34px] leading-none">{fmt.format(stats.fights)}</dd>
          <dt className="text-[13px] text-ink3">fights live in the app</dt>
        </div>
        <div>
          <dd className="serif mb-1.5 text-[34px] leading-none">{fmt.format(stats.events)}</dd>
          <dt className="text-[13px] text-ink3">events tracked</dt>
        </div>
      </dl>
      <p className="text-[15px] text-ink2">
        Real numbers from an app I built and run. {stats.live ? "Updated hourly." : "Last known values."}
      </p>
    </div>
  );
}

export function Hero() {
  return (
    <div className="wrap">
      <div className="grid grid-cols-1 items-center gap-10 py-10 pb-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-[72px] lg:py-[88px] lg:pb-24">
        <div>
          <p className="mono mb-7">{hero.eyebrow}</p>
          <h1 className="serif mb-7 text-[42px] leading-[1.04] sm:text-[56px] lg:text-[66px]">
            {hero.headline}
          </h1>
          <p className="mb-9 max-w-[560px] text-[17px] text-ink2 sm:text-[19px]">{hero.lede}</p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            <TextLink href={hero.secondaryCta.href}>{hero.secondaryCta.label}</TextLink>
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
          <Image
            src="/mike-primak.png"
            alt={`${site.name}, smiling`}
            width={1019}
            height={1131}
            priority
            sizes="(min-width: 1024px) 264px, 160px"
            className="h-auto w-40 lg:w-[264px]"
          />
          <LiveCard />
        </div>
      </div>
    </div>
  );
}
