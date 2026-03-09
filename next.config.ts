import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  // Disable SWC Minify to significantly reduce peak memory usage
  swcMinify: false,
  experimental: {
    optimizePackageImports: ['react-icons', 'recharts']
  }
};

export default nextConfig;
