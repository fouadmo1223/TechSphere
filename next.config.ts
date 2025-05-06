import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
