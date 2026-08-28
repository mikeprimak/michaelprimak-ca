import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="wrap py-24 sm:py-40">
      <p className="mono mb-7">404</p>
      <h1 className="serif mb-5 text-[42px] leading-[1.04] sm:text-[66px]">That page isn’t here.</h1>
      <p className="mb-9 max-w-[560px] text-[19px] text-ink2">
        The link may be old, or the page may have moved when the site was rebuilt.
      </p>
      <Button href="/">Back to the home page</Button>
    </div>
  );
}
