import type { NextConfig } from "next";
import path from "node:path";

import { legacyRedirectsForNext } from "./config/legacy-redirects.mjs";

const nextConfig: NextConfig = {
  output: "standalone",
  skipTrailingSlashRedirect: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sfo.cloud.appwrite.io",
        port: "",
        pathname: "/v1/storage/buckets/**",
      },
    ],
  },
  redirects: legacyRedirectsForNext,
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
