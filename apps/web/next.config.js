/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    externalDir: true,
  },
  transpilePackages: ['@mirrorful/core', '@mirrorful/blocks'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mirrorful-production.s3.us-west-1.amazonaws.com',
        port: '',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'mirrorful-production.s3.us-west-1.amazonaws.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig
