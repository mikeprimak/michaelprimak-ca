"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

const BounceLayer = dynamic(() => import("./bounce-layer"), { ssr: false });

/**
 * On/off switch for the bouncing ball, shown in the header on the home page only.
 * The setting lives in sessionStorage as a tiny external store, so it survives a trip to a
 * case study and back but is forgotten when the tab closes. Reading it through
 * useSyncExternalStore (server snapshot: off) avoids a hydration mismatch.
 * Hidden entirely for visitors who prefer reduced motion.
 */
const KEY = "bounce";
const listeners = new Set<() => void>();
const read = () => {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
};
const write = (on: boolean) => {
  try {
    if (on) sessionStorage.setItem(KEY, "1");
    else sessionStorage.removeItem(KEY);
  } catch {
    /* private mode: the toggle still works for this render cycle via listeners */
  }
  listeners.forEach((l) => l());
};
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};
const stop = () => write(false);

/** The button. Rendered twice in the header (desktop and phone layouts); either copy flips the store. */
export function BounceToggle({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const on = useSyncExternalStore(subscribe, read, () => false);
  if (pathname !== "/") return null;
  return (
    <button
      type="button"
      onClick={() => write(!on)}
      aria-pressed={on}
      aria-label={on ? "Stop the bouncing ball" : "Start the bouncing ball"}
      title={on ? "Stop the ball (Esc)" : "Bouncing ball"}
      className={`inline-flex size-10 items-center justify-center rounded-full text-ink2 transition-colors hover:bg-bg2 hover:text-ink motion-reduce:hidden ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="size-5" aria-hidden="true">
        <circle cx="14.5" cy="12" r="5.5" fill={on ? "currentColor" : "none"} />
        <path d="M3 8.5h4M2 12h4M3 15.5h4" />
      </svg>
    </button>
  );
}

/** Mounts the ball itself. Rendered exactly once, so only one engine ever runs. */
export function BounceMount() {
  const pathname = usePathname();
  const on = useSyncExternalStore(subscribe, read, () => false);
  if (pathname !== "/" || !on) return null;
  return <BounceLayer onStop={stop} />;
}
