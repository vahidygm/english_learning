import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8083',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;
