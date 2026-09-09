import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Not part of the app: recovered old-site source and the design-mock generator.
    "reference/**",
    "design/**",
    // Static demo of a client site, rendered from its original PHP; theme JS is not ours.
    "public/demo/**",
  ]),
]);

export default eslintConfig;
