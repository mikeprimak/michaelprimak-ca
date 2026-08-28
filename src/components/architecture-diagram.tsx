/** Good Fights system diagram. Pure SVG, themed via CSS variables. */
export function GoodFightsArchitecture() {
  const box = "fill-none stroke-ink";
  const title = "fill-ink font-sans text-[14px]";
  const sub = "fill-ink3 font-mono text-[11px]";
  return (
    <figure className="w-full max-w-[760px]">
      <svg viewBox="0 0 760 300" role="img" aria-labelledby="arch-title" className="block h-auto w-full">
        <title id="arch-title">
          Mobile app and web front-ends talk to a REST API backed by PostgreSQL; daily scrapers feed the database.
        </title>
        <defs>
          <marker id="arch-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M0 0L10 5 0 10z" className="fill-ink3" />
          </marker>
        </defs>
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
          <text x="380" y="122" className={sub}>Node · Express · TS</text>
          <text x="650" y="100" className={title}>Database</text>
          <text x="650" y="122" className={sub}>PostgreSQL · Prisma</text>
          <text x="380" y="238" className={title}>Daily scrapers</text>
          <text x="380" y="260" className={sub}>VPS cron · results &amp; stats</text>
        </g>
        <g fill="none" strokeWidth="1.2" className="stroke-ink3" markerEnd="url(#arch-arrow)">
          <path d="M210 56C245 56 245 106 280 106" />
          <path d="M210 156C245 156 245 106 280 106" />
          <path d="M480 106L550 106" />
          <path d="M480 244C515 244 515 142 550 142" />
        </g>
      </svg>
    </figure>
  );
}
