import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, "../../"),
  turbopack: {
    root: path.join(__dirname, "../../"),
  },
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "retispec-cms", port: "1337" },
      { protocol: "https", hostname: "*.retispec.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "static.wixstatic.com" },
      { protocol: "https", hostname: "logo.clearbit.com" },
      { protocol: "https", hostname: "aberdeeneyes.co.uk" },
      { protocol: "http", hostname: "retispec-cms.49.12.207.132.sslip.io" },
    ],
  },
};

export default nextConfig;
