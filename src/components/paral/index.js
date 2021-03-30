// meta - React
import React, { useEffect } from "react"
import "react-hot-loader"

// meta - Components
import Intro from "./First/intro"
import Cards from "../cards"
import { urls as productURLs, products } from "../../config/products"
import { urls as statURLs, stats } from "../../config/stats"
import { urls as infoURLs, infos } from "../../config/infos"
import { isVertical } from "../../module"

import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons"
import Earth from "../earth"

const classes = ["card-title", "card-subtitle", "parallax-card-layers"]

export default () => {
  function applyVertical() {
    const vertical = isVertical()
    for (const className of classes)
      for (const element of document.getElementsByClassName(className))
        if (vertical) element.classList.add("vertical")
        else element.classList.remove("vertical")
  }

  useEffect(() => {
    setTimeout(() => applyVertical())
    window.addEventListener("resize", applyVertical)
    return function cleanup() {
      window.removeEventListener("resize", applyVertical)
    }
  })

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
      <Intro
        cursor
        strings={[
          "Welcome to Seong-Land",
          "Welcome to Seong-Land",
          "You can",
          "Spin the Earth",
          "Visit awesome projects",
          "Visit awesome projects",
          "All that things are below",
          "All that things are below",
          "Try Swipe Cards",
          "Anyway, Welcome",
          "Anyway, Welcome",
          "Seong-Land",
        ]}
      />
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
      <Earth tween={true} ratios={[2 / 3, 1 / 2]} />
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
      <Intro strings={["Services"]} />
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
      <Intro strings={["Products"]} />
    </ParallaxLayer>
  )

  const Infos = () => (
    <ParallaxLayer
      offset={2.0}
      speed={1}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Cards deck={infos} urls={infoURLs} />
      <Intro strings={["Informations"]} />
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
    </Parallax>
  )
}
