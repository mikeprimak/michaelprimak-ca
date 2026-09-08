import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root. Without this Next walks up and finds
  // C:\Users\avoca\pnpm-lock.yaml, which is outside this repo.
  turbopack: { root: __dirname },
};

export default nextConfig;
