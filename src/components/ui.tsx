import type { ComponentProps, ReactNode } from "react";
import { ListenButton } from "./listen-button";
import { SectionLink } from "./section-link";

export function Arrow({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

type ButtonProps = {
  href?: string;
  children: ReactNode;
  size?: "md" | "sm";
  className?: string;
  /** Invert colours (for use on a dark callout). */
  inverted?: boolean;
  /** `outline` is the same shape with a border instead of a fill, for a secondary action. */
  variant?: "solid" | "outline";
  /** Called on click for both the link and the button form. */
  onClick?: () => void;
} & Omit<ComponentProps<"button">, "children" | "className" | "onClick">;

const btnBase =
  "inline-flex shrink-0 items-center gap-2.5 rounded-full font-medium whitespace-nowrap transition-colors disabled:opacity-60";

export function Button({
  href,
  children,
  size = "md",
  className = "",
  inverted = false,
  variant = "solid",
  onClick,
  ...rest
}: ButtonProps) {
  const fill =
    variant === "outline"
      ? "border border-ink text-ink hover:border-accent hover:text-accent"
      : inverted
        ? "bg-bg text-ink hover:bg-accent hover:text-on-accent"
        : "bg-btn-bg text-btn-fg hover:bg-accent hover:text-on-accent disabled:hover:bg-btn-bg disabled:hover:text-btn-fg";
  const cls = [
    btnBase,
    size === "md" ? "h-[52px] px-6 text-[16px]" : "h-[42px] px-[18px] text-[15px]",
    fill,
    className,
  ].join(" ");
  if (href) {
    return (
      <SectionLink href={href} className={cls} onClick={onClick} data-no-read>
        {children}
        <Arrow />
      </SectionLink>
    );
  }
  return (
    <button className={cls} onClick={onClick} data-no-read {...rest}>
      {children}
      <Arrow />
    </button>
  );
}

export function TextLink({
  href,
  children,
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const cls = `inline-flex items-center gap-2 border-b border-line pb-0.5 font-medium text-ink transition-colors hover:border-accent hover:text-accent ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} data-no-read>
        {children}
        <Arrow />
      </a>
    );
  }
  return (
    <SectionLink href={href} className={cls} data-no-read>
      {children}
      <Arrow />
    </SectionLink>
  );
}

/** "01 —— Services" style section label. Pass `readId` to add a Listen button on the right. */
export function Eyebrow({ number, label, readId }: { number?: string; label: string; readId?: string }) {
  return (
    <div className="mb-7 flex items-center gap-3.5">
      {number && (
        <>
          <span className="mono">{number}</span>
          <span aria-hidden="true" className="block h-px w-7 bg-ink3" />
        </>
      )}
      <span className="mono">{label}</span>
      {readId && <ListenButton targetId={readId} className="ml-auto" />}
    </div>
  );
}

export function SectionHeading({
  children,
  intro,
  className = "",
}: {
  children: ReactNode;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="serif mb-5 max-w-[760px] text-[34px] leading-[1.08] sm:text-[46px]">
        {children}
      </h2>
      {intro && (
        <p className="mb-9 max-w-[620px] text-[17px] text-ink2 sm:mb-14 sm:text-[19px]">
          {intro}
        </p>
      )}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-16 border-t border-line py-16 sm:py-24 ${className}`}
    >
      <div className="wrap">{children}</div>
    </section>
  );
}
