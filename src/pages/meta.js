import React from 'react'
import MetaTags from 'react-meta-tags';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default class Meta extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <MetaTags>
          <meta charSet="utf-8" />
          <title>Seong-Land</title>
          <meta property="og:url" content="https://www.seonglae.com/" />
          <meta property="og:image" content="../images/ogtag.png" />
          <meta property="og:title" content="Seong-Land" />
          <meta property="og:description" content="Land Will Guide You to know Seong-lae" />
        </MetaTags>
        <HelmetProvider>
          <Helmet>
            <link rel="icon" type="image/png" content="../images/favicon.png" />
          </Helmet>
        </HelmetProvider>
      </div>
    )
  }
}