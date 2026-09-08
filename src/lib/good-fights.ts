/**
 * Live numbers from the Good Fights API for the hero card.
 * Cached for an hour (ISR). Falls back to the last known values if the API is
 * slow or down, so the page never waits on it.
 */

const API = "https://fightcrewapp-backend.onrender.com/api";

export type LiveStats = {
  fights: number;
  events: number;
  live: boolean;
};

// Last known values (2026-09-08). Used when the API can't be reached.
//
// These are lower than the raw table counts (15,730 fights / 1,635 events) because
// /api/fights and /api/events exclude cancelled bouts and shelved promotions — i.e.
// this is what a user can actually see in the app, which is the honest number to show
// on a live card. The case study quotes the full database figures.
const FALLBACK: LiveStats = { fights: 15344, events: 1573, live: false };

async function total(path: string): Promise<number> {
  const res = await fetch(`${API}${path}?limit=1`, {
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  const json = (await res.json()) as { pagination?: { total?: number } };
  const n = json.pagination?.total;
  if (typeof n !== "number") throw new Error(`${path}: no total`);
  return n;
}

export async function getLiveStats(): Promise<LiveStats> {
  try {
    const [fights, events] = await Promise.all([total("/fights"), total("/events")]);
    return { fights, events, live: true };
  } catch {
    return FALLBACK;
  }
}
