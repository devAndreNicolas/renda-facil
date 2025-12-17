/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  output: 'export',

  images: {
    unoptimized: true,
  },

  async generateBuildId() {
    return 'rendecerto-build';
  },
};

module.exports = nextConfig;
