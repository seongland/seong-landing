// meta - React
import React, { useEffect, useState } from "react"
import "react-hot-loader"

// meta - Components
import Intro from "./First/intro"
import Cards from "../cards"
import Earth from "../earth"
import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons"
import { urls as productURLs, products } from "../../config/products"
import { urls as statURLs, stats } from "../../config/stats"
import { urls as infoURLs, infos } from "../../config/infos"

// meta - Other
import "./paral.css"

export default () => {
  useEffect(() => {
    window.addEventListener("resize", applyVertical)
    setTimeout(() => applyVertical())
    return function cleanup() {
      window.removeEventListener("resize", applyVertical)
    }
  })
  const [offset, setOffset] = useState(
    window.innerHeight > window.innerWidth ? 2.8 : 2.99
  )

  function applyVertical() {
    setOffset(window.innerHeight > window.innerWidth ? 2.8 : 2.99)
    const vertical = isVertical()
    for (const className of classes)
      for (const element of document.getElementsByClassName(className))
        if (vertical) element.classList.add("vertical")
        else element.classList.remove("vertical")
  }

  const EarthB = () => (
    <ParallaxLayer
      offset={offset}
      speed={2}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Earth ratios={[1, 1]} />
    </ParallaxLayer>
  )

  return (
    <Parallax ref={ref => (React.parallax = ref)} pages={3}>
      <Cover />
      <Stars />
      <EarthT />
      <Text />
      <Products />
      <Stats />
      <Infos />
      <EarthB />
    </Parallax>
  )
}

const Cover = () => (
  <ParallaxLayer
    factor={4}
    style={{ backgroundColor: "rgb(32,32,32)", backgroundSize: "cover" }}
  />
)
const Stars = () => (
  <ParallaxLayer
    factor={3}
    style={{
      backgroundImage: 'url("/stars.svg")',
      backgroundSize: "cover",
    }}
  />
)

const Text = () => (
  <ParallaxLayer
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
)

const EarthT = () => (
  <ParallaxLayer
    speed={-0.1}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Earth ratios={[2 / 3, 1 / 2]} />
  </ParallaxLayer>
)

const Infos = () => (
  <ParallaxLayer
    offset={2.0}
    speed={3}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Cards deck={infos} urls={infoURLs} />
  </ParallaxLayer>
)

const Products = () => (
  <ParallaxLayer
    offset={1.0}
    speed={2}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Cards deck={products} urls={productURLs} />
  </ParallaxLayer>
)

const Stats = () => (
  <ParallaxLayer
    offset={1.95}
    speed={1}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Cards deck={stats} urls={statURLs} />
  </ParallaxLayer>
)

const classes = [
  "card-title",
  "value",
  "property",
  "mark",
  "left",
  "right",
  "bottom",
  "top",
  "parallax-card-layers",
]

const isVertical = () => {
  if (window.innerHeight > window.innerWidth) return true
  return false
}
