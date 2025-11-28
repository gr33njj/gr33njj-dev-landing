/** @type {import('next').NextConfig} */
const nextConfig = {
  // Using standalone output for better Docker/Self-hosting support
  output: 'standalone',
  images: {
    unoptimized: true, // Important for simple deployments
  },
  // Optimization for build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig


