import React from 'react'

const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`


const Clouds = () => (
  <div>
    {/* meta - clouds */}
    <img src={url('cloud')}
      style={{ display: 'block', width: '20%', marginLeft: '55%' }} alt='cloud' />
    <img src={url('cloud')}
      style={{ display: 'block', width: '10%', marginLeft: '15%' }} alt='cloud' />
  </div>
)

export default Clouds