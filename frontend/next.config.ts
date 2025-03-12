import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*", 
        destination: "http://localhost:5001/api/:path*", // Proxy API to backend
      },
    ];
  },
  webpack(config) {
    config.resolve.fallback = { fs: false }; // Ensuring fs module is not bundled in client side
    return config;
  },
};

export default nextConfig;
