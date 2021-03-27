// meta - React
import React, { useEffect, useState, Suspense } from "react"
import "react-hot-loader"

// meta - Components
import Intro from "./First/intro"
import Cards from "../cards"
import { urls as productURLs, products } from "../../config/products"
import { urls as statURLs, stats } from "../../config/stats"
import { urls as infoURLs, infos } from "../../config/infos"

import { Parallax, ParallaxLayer }  from "react-spring/renderprops-addons"
const Earth = React.lazy(() => import("../earth"))


export default () => {
  useEffect(() => {
    window.addEventListener("resize", applyVertical)
    setTimeout(() => applyVertical())
    return function cleanup() {
      window.removeEventListener("resize", applyVertical)
    }
  })
  const [offset, setOffset] = useState(3)

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
      <Suspense fallback={<div></div>}>
        <Earth ratios={[1, 1]} />
        </Suspense>
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
        <EarthB />
        <Infos />
      </Parallax>
  )
}

const Cover = () => (
  <ParallaxLayer
    factor={4}
    style={{ backgroundColor: "rgb(30,30,30)", backgroundSize: "cover" }}
  />
)
const Stars = () => (
  <ParallaxLayer
    factor={3}
    style={{
      backgroundImage: 'url("/stars.svg")',
      backgroundSize: "cover",
      WebkitMaskImage:
        "-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,0.9)), to(rgba(0,0,0,0.5)))",
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
  <Suspense fallback={<div></div>}>
    <Earth ratios={[2 / 3, 1 / 2]} />
    </Suspense>
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
  "card-subtitle",
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
