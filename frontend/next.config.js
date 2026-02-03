/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  },
  // Enable serverless rendering (dynamic, not static)
  experimental: {
    isrMemoryCacheSize: 0,
  },
  // Disable ISR and static generation for dynamic pages
  onDemandEntries: {
    maxInactiveAge: 1000 * 60, // 1 minute
    pagesBufferLength: 5,
  },
};

module.exports = nextConfig;
