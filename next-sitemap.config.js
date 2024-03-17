module.exports = {
    siteUrl: process.env.SITE_URL || 'https://www.andys-code.com',
    generateRobotsTxt: true,
    changefreq: 'monthly',               // Tells search engines how often the urls will probably change 'always', 'hourly', 'daily', 'weekly', 'monthly' 'yearly', 'never'
    generateIndexSitemap: false,        // False means just have one sitemap.xml file. true means have index sitemaps sitemap-0.xml sitemap-1.xml etc.

    // Exclude the members area from the site map
    exclude: ['/members/*'],

    // Exclude the members area from the robots text file
    robotsTxtOptions: {
        policies: [
            { userAgent: "*", disallow: "/members/*"},
            { userAgent: "*", allow: "/"}
        ]
    }

    // ...other options
  }