/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // Configuração para sitemap
  async generateBuildId() {
    return 'rendafacil-build'
  },
}

module.exports = nextConfig

