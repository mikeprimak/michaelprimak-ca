"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { startBounce } from "./engine";

/**
 * Full-viewport canvas the ball is drawn on. Portalled to <body> so no ancestor with a
 * transform or filter can capture the fixed positioning. It sits above the page content
 * and below the sticky header (z-50) and mobile menu (z-40); pointer events pass through.
 * Loaded on demand by BounceToggle, so visitors who never press the button download nothing.
 */
export default function BounceLayer({ onStop }: { onStop: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    return startBounce(canvas, onStop);
  }, [onStop]);
  return createPortal(
    <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 h-full w-full" />,
    document.body,
  );
}
