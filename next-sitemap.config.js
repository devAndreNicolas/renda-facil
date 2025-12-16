/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://rendecerto.com.br',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/privacy', '/terms'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
  },
};

