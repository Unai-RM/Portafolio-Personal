/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
  },
  webpack: (config) => {
    config.resolve.alias['@'] = __dirname;
    return config;
  }
}

module.exports = nextConfig
