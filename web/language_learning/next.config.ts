import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["3009.mkce.ir"],
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
