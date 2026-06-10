import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /** Évite que Next prenne un lockfile parent (ex. monorepo Web2) comme racine du tracing. */
  outputFileTracingRoot: __dirname,
  async redirects() {
    return [
      { source: "/connexion", destination: "/login", permanent: false },
      { source: "/inscription", destination: "/signup", permanent: false },
    ];
  },
};

export default nextConfig;
