/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    externalDir: true,
  },
  transpilePackages: ['@mirrorful/core', '@mirrorful/blocks'],
}

module.exports = nextConfig
