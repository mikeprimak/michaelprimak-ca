import { ImageResponse } from "next/og";
import { hero, site } from "@/content/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Fetch a Google Font's TTF so the OG image matches the site's display face. */
async function loadFont(family: string, text: string): Promise<ArrayBuffer | undefined> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}&text=${encodeURIComponent(text)}`,
      { headers: { "User-Agent": "Mozilla/5.0" } },
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return undefined;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return undefined;
  }
}

export default async function OpenGraphImage() {
  const text = `${hero.headline}${site.name}${site.url}Freelance developer · Web & mobile`;
  const serif = await loadFont("Instrument Serif", text);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f4f1ea",
          color: "#1a1815",
          fontFamily: serif ? "Instrument Serif" : "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 2, color: "#7d786e", textTransform: "uppercase" }}>
          Freelance developer · Web &amp; mobile
        </div>
        <div style={{ display: "flex", fontSize: 76, lineHeight: 1.04, letterSpacing: -1, maxWidth: 1000 }}>
          {hero.headline}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30 }}>
          <span>{site.name}</span>
          <span style={{ color: "#b8491f" }}>{site.url.replace("https://", "")}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: serif ? [{ name: "Instrument Serif", data: serif, style: "normal", weight: 400 }] : undefined,
    },
  );
}
