module.exports = {
  siteMetadata: {
    siteUrl: `https://www.seonglae.com`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-97880882-3",
        // this option places the tracking script into the head of the DOM
        head: true,
        // other options
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://www.seonglae.com",
        sitemap: "https://www.seonglae.com/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-csp`,
      options: {
        disableOnDev: true,
        reportOnly: false,
        mergeScriptHashes: true,
        mergeStyleHashes: false,
        mergeDefaultDirectives: true,
        directives: {
          "script-src": "'self' www.google-analytics.com 'unsafe-inline'",
          "style-src-elem": "'self' fonts.googleapis.com data: 'unsafe-inline'",
          "style-src": "'self' 'unsafe-inline'",
          "font-src": "'self' fonts.gstatic.com 'unsafe-inline'",
          "connect-src":
            "'self' stats.g.doubleclick.net www.google-analytics.com 'unsafe-inline'",
          "frame-src": "'self' vizydrop.com 'unsafe-inline'",
          "img-src":
            "'self' www.google-analytics.com 'unsafe-inline' 'img.buymeacoffee.com'",
        },
      },
    },
  ],
  // your another plugins
}
