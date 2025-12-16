/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // Configuração para sitemap
  async generateBuildId() {
    return 'rendecerto-build'
  },
}

module.exports = nextConfig

