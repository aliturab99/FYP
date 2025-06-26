/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    suppressHydrationWarning: true
  },
  // Additional hydration handling
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Optimize for client-side rendering
  swcMinify: true,
  images: {
    domains: ['localhost'],
    unoptimized: true
  }
};

export default nextConfig;
