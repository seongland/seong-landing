import React from "react"
import { Helmet as Header } from "react-helmet-async"

const IndexPage = () => {
  return (
    <main id="main">
      <Header
        htmlAttributes={{
          lang: "en",
        }}
      >
        <meta charSet="utf-8" />
        <title>Seong-Land</title>
        <link
          rel="preload prefetch"
          as="image"
          type="image/svg+xml"
          href="https://www.seongland.com/buymeacoffee.svg"
        />
        <link rel="icon" href="/seongland.svg" />
        <meta
          name="description"
          content="Land Will Guide You to know Seong-lae"
        />
        <meta property="fb:app_id" content="419108182355029" />
        <meta property="og:site_name" content="Seong-Land" />
        <meta property="og:url" content="https://www.seongland.com/" />
        <meta property="og:image" content="https://seongland.com/ogtag.png" />
        <meta property="og:title" content="Seong-Land" />
        <meta
          property="og:description"
          content="Land Will Guide You to know Seong-lae"
        />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:type" content="website" />
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "c8b3924687ca4bdaaf9bd8f31abbd40b"}'
        />
      </Header>
    </main>
  )
}

export default IndexPage
