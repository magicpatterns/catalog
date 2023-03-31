/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: '/colors',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
