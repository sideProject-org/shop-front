import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  webpack: (config: {
    module: { rules: { test: RegExp; use: string[] }[] };
  }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
