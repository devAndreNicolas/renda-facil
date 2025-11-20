/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://rendafacil.br',
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

