/**
 * Renders the Meaford Osteopathy PHP site (a plain-PHP theme: variables and
 * includes, no database) to static HTML under public/demo/meaford-osteopathy,
 * copying only the assets the rendered pages actually reference. The clinic
 * has since moved to Squarespace, so this is the only place the site as built
 * can be seen.
 *
 *   node scripts/build-meaford-demo.mjs
 *
 * Needs a php.exe: set MEAFORD_PHP, or put php on PATH.
 * Source folder: MEAFORD_SRC (default C:\Users\avoca\michaelprimak-ca\projects\MeafordOsteopathy).
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const SRC = process.env.MEAFORD_SRC ?? "C:/Users/avoca/michaelprimak-ca/projects/MeafordOsteopathy";
const PHP = process.env.MEAFORD_PHP ?? "php";
const OUT = path.resolve("public/demo/meaford-osteopathy");
const BASE = "/demo/meaford-osteopathy/";

// php file -> pretty path (matches the original .htaccess rewrite rules)
const PAGES = {
  "index.php": "",
  "what-is-osteopathy.php": "What-Is-Osteopathy",
  "about-rachel-gorman-osteopath.php": "About-Rachel-Gorman-Osteopath",
  "patient-resources.php": "Patient-Resources",
  "contact-meaford-osteopathy.php": "Contact-Meaford-Osteopathy",
  "what-is-osteopathy-article.php": "What-Is-Osteopathy-Blog-Post",
  "covid-19.php": "covid-19",
};

const LINK_MAP = {
  "https://michaelprimak.ca/projects/MeafordOsteopathydev2/MOservices.php": BASE,
  "https://michaelprimak.ca/projects/MeafordOsteopathy": BASE,
  "https://meafordosteopathy.com/What-Is-Osteopathy": BASE + "What-Is-Osteopathy",
};
for (const [php, pretty] of Object.entries(PAGES)) LINK_MAP[php] = BASE + pretty;

const isExternal = (u) => /^(https?:|\/\/|\/|#|mailto:|tel:|data:|javascript:|sms:)/i.test(u);
const assets = new Set();

function absolutize(html) {
  html = html.replace(/(href|src)=(["'])([^"']*)\2/g, (m, attr, q, url) => {
    url = url.trim();
    if (LINK_MAP[url]) return `${attr}=${q}${LINK_MAP[url]}${q}`;
    if (!url || isExternal(url)) return m;
    if (PAGES[url] !== undefined) return `${attr}=${q}${BASE}${PAGES[url]}${q}`;
    if (Object.values(PAGES).includes(url)) return `${attr}=${q}${BASE}${url}${q}`;
    assets.add(url.split("?")[0].split("#")[0]);
    return `${attr}=${q}${BASE}${url}${q}`;
  });
  html = html.replace(/url\((['"]?)([^'")]+)\1\)/g, (m, q, url) => {
    url = url.trim();
    if (!url || isExternal(url)) return m;
    assets.add(url.split("?")[0].split("#")[0]);
    return `url(${q}${BASE}${url}${q})`;
  });
  return html;
}

function copyAsset(rel) {
  const from = path.join(SRC, rel);
  if (!fs.existsSync(from) || fs.statSync(from).isDirectory()) return false;
  const to = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  return true;
}

// url() references inside a stylesheet are relative to that stylesheet.
function cssDeps(rel) {
  const text = fs.readFileSync(path.join(SRC, rel), "utf8");
  const dir = path.posix.dirname(rel.split(path.sep).join("/"));
  const out = [];
  for (const m of text.matchAll(/url\((['"]?)([^'")]+)\1\)|@import\s+(?:url\()?["']([^"')]+)["']/g)) {
    const u = (m[2] ?? m[3] ?? "").trim();
    if (!u || isExternal(u)) continue;
    out.push(path.posix.normalize(path.posix.join(dir, u.split("?")[0].split("#")[0])));
  }
  return out;
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

for (const [php, pretty] of Object.entries(PAGES)) {
  let html = execFileSync(PHP, ["-d", "display_errors=0", php], { cwd: SRC, maxBuffer: 1 << 26 }).toString("utf8");
  html = absolutize(html);
  const banner = `<!-- Rendered to static HTML from the original PHP source for michaelprimak.ca. The clinic's live site has since moved elsewhere; this is the site as built. -->\n`;
  html = html.replace(/<!DOCTYPE html>/i, (m) => `${m}\n${banner}`);
  const dir = path.join(OUT, pretty);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
  console.log("page", pretty || "/");
}

// The theme's scripts load a few of their own files at runtime.
for (const rel of ["js/jquery.js", "js/plugins.js", "js/functions.js", "images/blank.svg"]) assets.add(rel);

const queue = [...assets];
const done = new Set();
let bytes = 0;
while (queue.length) {
  const rel = path.posix.normalize(queue.shift().split(path.sep).join("/"));
  if (done.has(rel) || rel.startsWith("..")) continue;
  done.add(rel);
  if (!copyAsset(rel)) {
    console.warn("  missing:", rel);
    continue;
  }
  bytes += fs.statSync(path.join(SRC, rel)).size;
  if (rel.endsWith(".css")) queue.push(...cssDeps(rel));
}
console.log(`copied ${done.size} assets, ${(bytes / 1024 / 1024).toFixed(1)} MB -> ${OUT}`);
