import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // www → apex（避免 SEO duplicate content）
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.hualientaxi.taxi" }],
        destination: "https://hualientaxi.taxi/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
