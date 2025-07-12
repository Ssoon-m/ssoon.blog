// next.config.js
const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['rehype-pretty-code', 'shiki'],
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'custom',
    loaderFile: '/my-loader.ts',
  },
};

module.exports = withContentlayer(nextConfig);
