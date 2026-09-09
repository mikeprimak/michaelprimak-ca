"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/**
 * A link that, when it points at a section of the page you are already on
 * (`/#work`), scrolls there and *replaces* the history entry instead of pushing
 * one. Without this, every in-page jump becomes a history entry and the Back
 * button walks the visitor through every section they looked at before it
 * finally takes them off the site.
 *
 * From any other page it behaves as a normal link, so `/#work` still navigates
 * home and scrolls.
 */
export function SectionLink({ href, onClick, children, ...rest }: Props) {
  const pathname = usePathname();
  const hash = href.startsWith("/#") ? href.slice(2) : href.startsWith("#") ? href.slice(1) : null;

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (
      !hash ||
      pathname !== "/" ||
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }
    const el = document.getElementById(hash);
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    // Keep Next's own router state on the entry; only the URL changes.
    window.history.replaceState(window.history.state, "", `/#${hash}`);
  };

  return (
    <Link href={href} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}
