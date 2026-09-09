/**
 * Live numbers from the Good Fights API, used by the hero card, the hero
 * paragraph and the Good Fights case study.
 *
 * How "updated hourly" actually works: those pages are statically generated
 * with `revalidate = 3600`, and these fetches carry the same TTL. On Vercel that
 * is stale-while-revalidate: once an hour has passed, the *next* visitor still
 * gets the cached page, and that visit triggers a rebuild in the background; the
 * visitor after them sees fresh numbers. So the numbers lag production by up to
 * an hour plus one visit. Nothing ever blocks a page on the API.
 *
 * Falls back to the last known values if the API is slow or down.
 */

const API = "https://fightcrewapp-backend.onrender.com/api";

/** Everything /api/public-stats returns. Raw database counts. */
export type PublicStats = {
  fightRatings: number;
  hypeRatings: number;
  /** fightRatings + hypeRatings — shown as "user ratings". */
  totalRatings: number;
  reviews: number;
  users: number;
  fights: number;
  events: number;
  fighters: number;
};

export type LiveStats = PublicStats & {
  /** Fights a user can see in the app (excludes cancelled bouts, shelved promotions). */
  fightsInApp: number;
  eventsInApp: number;
  /** True when the numbers came from the API on this build. */
  live: boolean;
};

// Last known values (2026-09-09, from packages/backend/scripts/portfolio-stats.ts).
// Used when the API can't be reached.
//
// fightsInApp/eventsInApp are lower than the raw table counts because /api/fights and
// /api/events exclude cancelled bouts and shelved promotions — what a user can
// actually see in the app, which is the honest number to show on a live card.
// The case study quotes the full database figures.
export const FALLBACK: LiveStats = {
  fightRatings: 76548,
  hypeRatings: 2146,
  totalRatings: 78694,
  reviews: 1456,
  users: 3423,
  fights: 15734,
  events: 1635,
  fighters: 10570,
  fightsInApp: 15348,
  eventsInApp: 1573,
  live: false,
};

const opts = { next: { revalidate: 3600 }, signal: AbortSignal.timeout(5000) } as const;

async function total(path: string): Promise<number> {
  const res = await fetch(`${API}${path}?limit=1`, opts);
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  const json = (await res.json()) as { pagination?: { total?: number } };
  const n = json.pagination?.total;
  if (typeof n !== "number") throw new Error(`${path}: no total`);
  return n;
}

async function publicStats(): Promise<PublicStats> {
  const res = await fetch(`${API}/public-stats`, opts);
  if (!res.ok) throw new Error(`/public-stats: ${res.status}`);
  const json = (await res.json()) as Partial<PublicStats>;
  const keys: (keyof PublicStats)[] = ["fightRatings", "hypeRatings", "totalRatings", "reviews", "users", "fights", "events", "fighters"];
  for (const k of keys) if (typeof json[k] !== "number") throw new Error(`/public-stats: no ${k}`);
  return json as PublicStats;
}

export async function getLiveStats(): Promise<LiveStats> {
  const [stats, fightsInApp, eventsInApp] = await Promise.allSettled([publicStats(), total("/fights"), total("/events")]);
  if (fightsInApp.status !== "fulfilled" || eventsInApp.status !== "fulfilled") return FALLBACK;
  // /api/public-stats is newer than the other two; until it is deployed, keep the fallback counts.
  const base = stats.status === "fulfilled" ? stats.value : FALLBACK;
  return { ...base, fightsInApp: fightsInApp.value, eventsInApp: eventsInApp.value, live: true };
}

const fmt = new Intl.NumberFormat("en-CA");

/**
 * Replace `{users}`, `{fightRatings}`, ... in copy with formatted live numbers,
 * so the case study and hero text stay in step with the card.
 */
export function fill(text: string, stats: LiveStats): string {
  return text.replace(/\{(\w+)\}/g, (m, key: string) => {
    const v = stats[key as keyof LiveStats];
    return typeof v === "number" ? fmt.format(v) : m;
  });
}
