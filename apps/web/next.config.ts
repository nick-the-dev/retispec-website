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
      {
        protocol: "http",
        hostname: "retispec-cms",
        port: "1337",
      },
      {
        protocol: "https",
        hostname: "*.retispec.com",
      },
    ],
  },
};

export default nextConfig;
