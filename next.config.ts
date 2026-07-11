import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  serverExternalPackages: [],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "cdn.oxland.in",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "4040",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4040",
      },
    ],
  },
};

export default nextConfig;
