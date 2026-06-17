/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  webpack: (config, { isServer }) => {
    // Exclude Supabase edge functions from Next.js build
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/supabase/**', '**/.next/**', '**/node_modules/**'],
    }
    return config
  },
}

module.exports = nextConfig
