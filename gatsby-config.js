module.exports = {
  siteMetadata: {
    siteUrl: `https://www.seongland.com`,
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
        host: "https://www.seongland.com",
        sitemap: "https://www.seongland.com/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-7GYN10MKSW",
        ],
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
          "script-src":
            "'self' www.googletagmanager.com www.google-analytics.com static.cloudflareinsights.com 'unsafe-inline'",
          "style-src-elem": "'self' data: 'unsafe-inline'",
          "style-src": "'self' 'unsafe-inline'",
          "font-src": "'self' fonts.gstatic.com 'unsafe-inline'",
          "connect-src":
            "'self' www.googletagmanager.com cloudflareinsights.com stats.g.doubleclick.net www.google-analytics.com 'unsafe-inline'",
          "frame-src": "'self' 'unsafe-inline'",
          "img-src":
            "'self' www.google-analytics.com 'unsafe-inline'",
        },
      },
    },
  ],
  // your another plugins
}
