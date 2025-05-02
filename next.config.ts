import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "i.ibb.co" }],
  },
};

export default nextConfig;
