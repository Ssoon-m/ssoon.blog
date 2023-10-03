// next.config.js
const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  images: { unoptimized: true },
};

module.exports = withContentlayer(nextConfig);
