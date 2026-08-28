"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { Button } from "./ui";
import { ThemeToggle } from "./theme";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu on Escape and lock scroll while it's open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="wrap">
      <nav aria-label="Main" className="flex h-16 items-center justify-between sm:h-[76px]">
        <Link href="/" className="serif text-2xl text-ink" onClick={() => setOpen(false)}>
          {site.name}
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] text-ink2 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
          <Button href="/#contact" size="sm">
            Start a project
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-bg2"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="size-6" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col gap-2 border-t border-line bg-bg px-5 py-6 md:hidden"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="serif rounded-xl px-3 py-3 text-3xl text-ink hover:bg-bg2"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 px-3">
            <Button href="/#contact" onClick={() => setOpen(false)}>
              Start a project
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
