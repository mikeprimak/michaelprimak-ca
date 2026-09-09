import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root. Without this Next walks up and finds
  // C:\Users\avoca\pnpm-lock.yaml, which is outside this repo.
  turbopack: { root: __dirname },
  // The Meaford Osteopathy demo is static HTML under public/demo/meaford-osteopathy,
  // one folder per page. These run *after* the filesystem check, so real files
  // (css, js, images) are served as-is and only page paths get an index.html.
  async rewrites() {
    return [
      { source: "/demo/meaford-osteopathy", destination: "/demo/meaford-osteopathy/index.html" },
      { source: "/demo/meaford-osteopathy/:page", destination: "/demo/meaford-osteopathy/:page/index.html" },
    ];
  },
};

export default nextConfig;
