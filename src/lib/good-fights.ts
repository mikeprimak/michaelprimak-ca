/**
 * Live numbers from the Good Fights API for the hero card.
 *
 * How "updated hourly" actually works: the home page is statically generated
 * with `revalidate = 3600`, and these fetches carry the same TTL. On Vercel that
 * is stale-while-revalidate: once an hour has passed, the *next* visitor still
 * gets the cached page, and that visit triggers a rebuild in the background; the
 * visitor after them sees fresh numbers. So the card lags production by up to an
 * hour plus one visit. It never blocks a page on the API.
 *
 * Falls back to the last known values if the API is slow or down.
 */

const API = "https://fightcrewapp-backend.onrender.com/api";

export type LiveStats = {
  /** Fight ratings + hype scores submitted by users, as one number. */
  ratings: number;
  /** Fights a user can see in the app (excludes cancelled bouts, shelved promotions). */
  fights: number;
  events: number;
  /** True when at least the fight count came from the API on this build. */
  live: boolean;
};

// Last known values (2026-09-09, from packages/backend/scripts/portfolio-stats.ts:
// 76,548 fight ratings + 2,146 hype scores). Used when the API can't be reached.
//
// fights/events are lower than the raw table counts because /api/fights and
// /api/events exclude cancelled bouts and shelved promotions — what a user can
// actually see in the app, which is the honest number to show on a live card.
const FALLBACK: LiveStats = { ratings: 78694, fights: 15348, events: 1573, live: false };

const opts = { next: { revalidate: 3600 }, signal: AbortSignal.timeout(5000) } as const;

async function total(path: string): Promise<number> {
  const res = await fetch(`${API}${path}?limit=1`, opts);
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  const json = (await res.json()) as { pagination?: { total?: number } };
  const n = json.pagination?.total;
  if (typeof n !== "number") throw new Error(`${path}: no total`);
  return n;
}

/** /api/public-stats is newer than the other two; if it is not deployed yet, keep the fallback. */
async function totalRatings(): Promise<number> {
  const res = await fetch(`${API}/public-stats`, opts);
  if (!res.ok) throw new Error(`/public-stats: ${res.status}`);
  const json = (await res.json()) as { totalRatings?: number };
  if (typeof json.totalRatings !== "number") throw new Error("/public-stats: no totalRatings");
  return json.totalRatings;
}

export async function getLiveStats(): Promise<LiveStats> {
  const [ratings, fights, events] = await Promise.allSettled([totalRatings(), total("/fights"), total("/events")]);
  if (fights.status !== "fulfilled" || events.status !== "fulfilled") return FALLBACK;
  return {
    ratings: ratings.status === "fulfilled" ? ratings.value : FALLBACK.ratings,
    fights: fights.value,
    events: events.value,
    live: true,
  };
}
