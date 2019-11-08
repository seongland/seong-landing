import React from 'react'

// meta - components
import Earth from './earth.js'
import Clouds from './clouds.js'
import Meta from './meta.js'
import '../components/paral.css'
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
import 'react-hot-loader';


// todo - enable react tool
// todo - earth z index
// todo - three z index
// todo - css library

const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`
const IndexPage = () => (
  <Parallax ref={ref => (React.parallax = ref)} pages={3}>
    <Meta/>
    <ParallaxLayer offset={0} speed={0} factor={3} style={{ backgroundColor: '#303032', backgroundSize: 'cover',}} />
    <ParallaxLayer offset={0} speed={0} factor={3} style={{ backgroundImage: url('stars', true), backgroundSize: 'cover', opacity: 0.5 }} />
    <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#805E73' }} />
    <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: '#87BCDE' }} />

    {/* meta - wall decoration */}\
    <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
      <img src={url('cloud')}
        style={{ display: 'block', width: '20%', marginLeft: '55%' }} alt='cloud' />
      <img src={url('cloud')}
        style={{ display: 'block', width: '10%', marginLeft: '15%' }} alt='cloud' />
    </ParallaxLayer>
    <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
      <Clouds />
    </ParallaxLayer>
    <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
      <img src={url('cloud')}
        style={{ display: 'block', width: '20%', marginLeft: '70%' }} alt='cloud' />
      <img src={url('cloud')}
        style={{ display: 'block', width: '20%', marginLeft: '40%' }} alt='cloud' />
    </ParallaxLayer>

    <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
      <img src={url('cloud')}
        style={{ display: 'block', width: '10%', marginLeft: '10%' }} alt='cloud' />
      <img src={url('cloud')}
        style={{ display: 'block', width: '20%', marginLeft: '75%' }} alt='cloud' />
    </ParallaxLayer>

    <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
      <img src={url('cloud')}
        style={{ display: 'block', width: '20%', marginLeft: '60%' }} alt='cloud' />
      <img src={url('cloud')}
        style={{ display: 'block', width: '25%', marginLeft: '30%' }} alt='cloud' />
      <img src={url('cloud')}
        style={{ display: 'block', width: '10%', marginLeft: '80%' }} alt='cloud' />
    </ParallaxLayer>

    <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
      <img src={url('cloud')}
        style={{ display: 'block', width: '20%', marginLeft: '5%' }} alt='cloud' />
      <img src={url('cloud')}
        style={{ display: 'block', width: '15%', marginLeft: '75%' }} alt='cloud' />
    </ParallaxLayer>
    {/* meta - satelltie */}
    <ParallaxLayer offset={1.3} speed={-0.3}
      style={{ pointerEvents: 'none' }}>
      <img src={url('satellite4')} style={{ width: '15%', marginLeft: '70%' }} alt='satellite' />
    </ParallaxLayer>
    <ParallaxLayer
      offset={2}
      speed={-0.3}
      style={{
        backgroundSize: '80%',
        backgroundPosition: 'center',
        backgroundImage: url('clients', true)
      }}
    />

    <ParallaxLayer offset={1} speed={0.1}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={url('bash')} style={{ width: '40%' }} alt='bash' />
    </ParallaxLayer>

    <ParallaxLayer offset={2} speed={-0}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={url('clients-main')} style={{ width: '40%' }} alt='clients' />
    </ParallaxLayer>

    {/* meta - earths */}
    <ParallaxLayer offset={0} speed={0.7}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Earth style={{ width: '80%' }} />
    </ParallaxLayer>

    <ParallaxLayer offset={2.5} speed={-0.4}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={url('earth')} style={{ width: '60%'  }} alt='earth' />
    </ParallaxLayer>

    {/* meta - contents */}
    <ParallaxLayer offset={0} speed={0.1}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
      <div style={{ width: '80%', margin: "10%", fontFamily: "'Anton', sans-serif", textAlign: "center" }}>
        <span style={{ color: "#fff", fontSize: "10vw" }}>
          Welcome to <br /> Seong-Land
        </span>
      </div>
    </ParallaxLayer>
  </Parallax>
)
export default IndexPage
