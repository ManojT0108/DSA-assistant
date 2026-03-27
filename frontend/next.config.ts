import type { NextConfig } from "next";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    proxyTimeout: 120_000,
  },
  async rewrites() {
    return [
      {
        source: "/api/assist/:slug*",
        destination: `${BACKEND_URL}/assist/:slug*`,
      },
      {
        source: "/api/hint/:slug*",
        destination: `${BACKEND_URL}/hint/:slug*`,
      },
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
