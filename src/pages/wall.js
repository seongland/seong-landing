import React from 'react'
import { ParallaxLayer } from 'react-spring/renderprops-addons'

const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

const Wall = () => (
  <div>
          {/* meta - background */}
    <ParallaxLayer offset={0} speed={0} factor={3} style={{ backgroundColor: '#303032', backgroundSize: 'cover',}} />
    <ParallaxLayer offset={0} speed={0} factor={3} style={{ backgroundImage: url('stars', true), backgroundSize: 'cover', opacity: 0.5 }} />
    <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#805E73' }} />
    <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: '#87BCDE' }} />
  </div>
)

export default Wall
