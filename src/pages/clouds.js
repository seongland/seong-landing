import React from 'react'
import { ParallaxLayer } from 'react-spring/renderprops-addons'

const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

const Clouds = () => (
  <div>
  {/* meta - clouds */}
  <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
    <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} alt='cloud' />
    <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} alt='cloud' />
  </ParallaxLayer>

  <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
    <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '70%' }} alt='cloud' />
    <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '40%' }} alt='cloud' />
  </ParallaxLayer>

  <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
    <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} alt='cloud' />
    <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '75%' }} alt='cloud' />
  </ParallaxLayer>

  <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
    <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '60%' }} alt='cloud' />
    <img src={url('cloud')} style={{ display: 'block', width: '25%', marginLeft: '30%' }} alt='cloud' />
    <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '80%' }} alt='cloud' />
  </ParallaxLayer>

  <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
    <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '5%' }} alt='cloud' />
    <img src={url('cloud')} style={{ display: 'block', width: '15%', marginLeft: '75%' }} alt='cloud' />
  </ParallaxLayer>

  </div>
)

export default Clouds