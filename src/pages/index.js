import React from 'react'
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
import Earth from './earth.js'
import Clouds from './clouds.js'
import Wall from './wall.js'

import '../components/paral.css'
import 'react-hot-loader';

// todo - enable react tool
// todo - earth z index
// todo - three z index
// todo - css library

const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`
const IndexPage = () => (
  <Parallax id="paral" ref={ref => (React.parallax = ref)} pages={3}>
    <Wall/>

    {/* meta - wall decoration */}
    <Clouds/>
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
    <ParallaxLayer offset={0} speed={0.1}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Earth style={{ width: '80%' }} />
    </ParallaxLayer>

    <ParallaxLayer offset={2.5} speed={-0.4}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
      <img src={url('earth')} style={{ width: '60%' }} alt='earth' />
    </ParallaxLayer>

    {/* meta - contents */}
    <ParallaxLayer offset={0} speed={0.1}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
      <div style={{ width: '80%', margin: "10%", fontFamily: "'Anton', sans-serif", textAlign:"center"}}>
        <span style={{color: "#fff", fontSize: "10vw" }}>
          Welcome to <br/> Seong-Land
        </span>
      </div>
    </ParallaxLayer>
  </Parallax>
) 
export default IndexPage
