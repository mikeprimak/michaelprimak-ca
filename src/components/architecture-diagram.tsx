/** Good Fights system diagram. Pure SVG, themed via CSS variables.
 *  Two drawings of the same system: a stacked one for phones, where the wide
 *  drawing shrank to unreadable, and the wide one from the `sm` breakpoint up.
 *  Only one is in the accessibility tree at a time. */

const CAPTION =
  "Mobile app and web front-ends talk to a REST API backed by PostgreSQL; daily automations (scrapers, Brave Search and Claude API processing) feed the database.";

function Arrow({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
        <path d="M0 0L10 5 0 10z" className="fill-ink3" />
      </marker>
    </defs>
  );
}

const box = "fill-none stroke-ink";

/** Stacked: the two front-ends side by side, then API, database and automations down the page. */
function Stacked() {
  const title = "fill-ink font-sans text-[17px]";
  const sub = "fill-ink3 font-mono text-[12px]";
  return (
    <svg viewBox="0 0 360 500" role="img" aria-labelledby="arch-title-s" className="block h-auto w-full sm:hidden">
      <title id="arch-title-s">{CAPTION}</title>
      <Arrow id="arch-arrow-s" />
      <g strokeWidth="1.4">
        <rect x="8" y="8" width="164" height="80" rx="12" className={box} />
        <rect x="188" y="8" width="164" height="80" rx="12" className={box} />
        <rect x="80" y="152" width="200" height="80" rx="12" className={box} />
        <rect x="80" y="296" width="200" height="80" rx="12" className={box} />
        <rect x="80" y="412" width="200" height="80" rx="12" strokeDasharray="5 5" className={box} />
      </g>
      <g textAnchor="middle">
        <text x="90" y="42" className={title}>Mobile app</text>
        <text x="90" y="66" className={sub}>React Native · Expo</text>
        <text x="270" y="42" className={title}>Web</text>
        <text x="270" y="66" className={sub}>Next.js · goodfights.app</text>
        <text x="180" y="186" className={title}>REST API</text>
        <text x="180" y="210" className={sub}>Node · Fastify · TS</text>
        <text x="180" y="330" className={title}>Database</text>
        <text x="180" y="354" className={sub}>PostgreSQL · Prisma</text>
        <text x="180" y="446" className={title}>Daily automations</text>
        <text x="180" y="470" className={sub}>scrapers · Brave Search · Claude API</text>
      </g>
      <g fill="none" strokeWidth="1.4" className="stroke-ink3" markerEnd="url(#arch-arrow-s)">
        <path d="M90 88C90 120 140 120 140 152" />
        <path d="M270 88C270 120 220 120 220 152" />
        <path d="M180 232L180 296" />
        <path d="M180 412L180 376" />
      </g>
    </svg>
  );
}

/** Wide: front-ends on the left, API in the middle, database on the right, automations below. */
function Wide() {
  const title = "fill-ink font-sans text-[14px]";
  const sub = "fill-ink3 font-mono text-[11px]";
  return (
    <svg viewBox="0 0 760 300" role="img" aria-labelledby="arch-title-w" className="hidden h-auto w-full sm:block">
      <title id="arch-title-w">{CAPTION}</title>
      <Arrow id="arch-arrow-w" />
      <g strokeWidth="1.2">
        <rect x="10" y="20" width="200" height="72" rx="10" className={box} />
        <rect x="10" y="120" width="200" height="72" rx="10" className={box} />
        <rect x="280" y="70" width="200" height="72" rx="10" className={box} />
        <rect x="550" y="70" width="200" height="72" rx="10" className={box} />
        <rect x="280" y="208" width="200" height="72" rx="10" strokeDasharray="4 4" className={box} />
      </g>
      <g textAnchor="middle">
        <text x="110" y="50" className={title}>Mobile app</text>
        <text x="110" y="72" className={sub}>React Native · Expo</text>
        <text x="110" y="150" className={title}>Web</text>
        <text x="110" y="172" className={sub}>Next.js · goodfights.app</text>
        <text x="380" y="100" className={title}>REST API</text>
        <text x="380" y="122" className={sub}>Node · Fastify · TS</text>
        <text x="650" y="100" className={title}>Database</text>
        <text x="650" y="122" className={sub}>PostgreSQL · Prisma</text>
        <text x="380" y="238" className={title}>Daily automations</text>
        <text x="380" y="260" className={sub}>scrapers · Brave Search · Claude API</text>
      </g>
      <g fill="none" strokeWidth="1.2" className="stroke-ink3" markerEnd="url(#arch-arrow-w)">
        <path d="M210 56C245 56 245 106 280 106" />
        <path d="M210 156C245 156 245 106 280 106" />
        <path d="M480 106L550 106" />
        <path d="M480 244C515 244 515 142 550 142" />
      </g>
    </svg>
  );
}

export function GoodFightsArchitecture() {
  return (
    <figure className="w-full max-w-[760px]">
      <Stacked />
      <Wide />
    </figure>
  );
}
