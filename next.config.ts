import type { NextConfig } from "next";

const isProd: boolean = process.env.NODE_ENV === 'production';

interface NextConfig {
  reactStrictMode: boolean;
  images: {
    unoptimized: boolean;
  };
  assetPrefix: string;
  basePath: string;
  output: string;
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? '/your-repository-name/' : '',
  basePath: isProd ? '/your-repository-name' : '',
  output: 'export',
};

export default nextConfig;
