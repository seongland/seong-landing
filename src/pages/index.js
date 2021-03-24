import React from "react"
import Paral from "../components/paral/index.js"
import { Helmet as OG } from "react-helmet"

import "react-hot-loader"
import "../components/paral/paral.css"

const IndexPage = () => (
  <div>
    <OG
      link={[{ rel: "shortcut icon", type: "image/png", href: "/favicon.png" }]}
    >
      <meta charSet="utf-8" />
      <title>Seong-Land</title>
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
      ></script>
    </OG>
    <Paral />
  </div>
)

export default IndexPage
