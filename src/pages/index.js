
import React from 'react'
import 'react-hot-loader';
import '../components/paral.css'
import ogtag from "../images/ogtag.png"
import { Helmet as OG } from 'react-helmet';
import Paral from './paral.js';
import favicon from '../images/favicon.png'

const IndexPage = () => (
  <div>
    <OG link={[
            { rel: 'shortcut icon', type: 'image/png', href: `${favicon}` },
          ]}>
      <meta charSet="utf-8" />
      <title>Seong-Land</title>
      <meta property="og:site_name" content="Seong-Land" />
      <meta property="og:url" content="https://www.seonglae.com/" />
      <meta property="og:image" content={ogtag} />
      <meta property="og:title" content="Seong-Land" />
      <meta property="og:description" content="Land Will Guide You to know Seong-lae" />
      <meta property="og:locale" content="ko_KR" />
    </OG>
    <Paral />
  </div>
)
export default IndexPage
