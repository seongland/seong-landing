module.exports = {
    plugins: [
      {
        resolve: `gatsby-transformer-sharp`
      },
      {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
          trackingId: "UA-97880882-3",
          // this option places the tracking script into the head of the DOM
          head: true,
          // other options
        },
      },
      // your another plugins
    ] 
  };