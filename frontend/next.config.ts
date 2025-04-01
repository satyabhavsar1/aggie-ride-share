import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    const apiUrl = process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_API_URL : 'http://localhost:5001/api'; 
      
    return [
      {
        source: "/api/:path*", 
        destination: `http://localhost:5001/api/:path*`, 
      },
    ];
  },
  webpack(config) {
    config.resolve.fallback = { fs: false }; 
    return config;
  },
};

export default nextConfig;
