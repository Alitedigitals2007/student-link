/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Next.js automatically picks up NEXT_PUBLIC_ variables from .env
  // Only use this block if you need to rename or override them.
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  },
  // Keep onDemandEntries for development performance if needed
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, 
    pagesBufferLength: 5,
  },
};

module.exports = nextConfig;
