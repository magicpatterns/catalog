// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withSentryConfig } = require('@sentry/nextjs')

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

module.exports = withSentryConfig(
  module.exports,
  { silent: true },
  { hideSourcemaps: true }
)
