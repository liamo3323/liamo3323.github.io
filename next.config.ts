import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  }
  basePath: '/liamo3323.github.io',
  assetPrefix: '/liamo3323.github.io',
};

export default nextConfig;