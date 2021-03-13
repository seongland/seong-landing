// meta - React
import React from "react"
import "react-hot-loader"

// meta - Components
import EarthT from "./First/earthT"
import EarthB from "./First/earthB"
import Protons from "./First/protons"
import Clouds from "./clouds.js"
import Intro from "./First/intro"
import Cards2 from "./Second/cards"
import Cards3 from "./Third/cards"
import Cards4 from "./Forth/cards"
import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons"

// meta - Other
import "./paral.css"

export default () => (
  <Parallax ref={ref => (React.parallax = ref)} pages={3}>
    <ParallaxLayer
      offset={0}
      speed={0}
      factor={3}
      style={{ backgroundColor: "rgb(32,32,32)", backgroundSize: "cover" }}
    />
    {/* @meta - First */}
    <ParallaxLayer
      offset={0}
      speed={0.1}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    ></ParallaxLayer>
    <ParallaxLayer
      offset={0}
      speed={0}
      factor={3}
      style={{ backgroundImage: 'url("/stars.svg")', backgroundSize: "cover" }}
    />
    <ParallaxLayer
      offset={0}
      speed={-0.1}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <EarthT />
    </ParallaxLayer>
    {/* @meta - Third */}
    <ParallaxLayer
      offset={window.innerHeight > window.innerWidth ? 2.8 : 2.99}
      speed={2}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <EarthB />
    </ParallaxLayer>
    {/* @meta - wall decoration */}\ // cards
    <ParallaxLayer
      offset={1.0}
      speed={2}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Cards2 />
    </ParallaxLayer>
    <ParallaxLayer
      offset={1.95}
      speed={1}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Cards3 />
    </ParallaxLayer>
    <ParallaxLayer
      offset={2.0}
      speed={3}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Cards4 />
    </ParallaxLayer>
    <ParallaxLayer
      offset={0}
      speed={0.7}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <Intro />
    </ParallaxLayer>
  </Parallax>
)
