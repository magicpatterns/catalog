/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    externalDir: true,
  },
  transpilePackages: ['@mirrorful/core'],
}

module.exports = nextConfig
