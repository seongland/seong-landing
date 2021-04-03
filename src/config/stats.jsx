import React from "react"
import { animated, interpolate } from "react-spring"
import { trans } from "../module/index.jsx"
import { OutboundLink } from "gatsby-plugin-google-gtag"

export const urls = [
  "https://github.com/seongland/intuiter",
  "https://opensea.io/accounts/Seongland",
]

const backgrounds = ["/intuiter.png", "/image/worker.png"]

const fills = ["white", "white"]
const colors = ["black", "white"]
const ratio = ["75%", "150%"]

const texts = [
  ["Intuiter", "raise your productivity"],
  ["NFT", "Unique Digital Photos"],
]

export const stats = (props, bind) =>
  props.map(({ x, y, rot, scale }, i) => (
    <animated.div
      key={i}
      className="card"
      style={{
        transform: interpolate(
          [x, y],
          (x, y) => `translate3d(${x}px,${y}px,0)`
        ),
      }}
    >
      <animated.div
        {...bind(i)}
        style={{
          background: `${fills[i]}`,
          width: "100vw",
          height: " 50vh",
          marginLeft: "20%",
          marginRight: "20%",
          border: "none",
          overflow: "hidden",
          transform: interpolate([rot, scale], trans),
        }}
      >
        <div
          className="card-title-wrapper"
          style={{
            background: `url("${backgrounds[i]}")`,
            backgroundPosition: "center center",
            backgroundSize: `auto ${ratio[i]}`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <OutboundLink
            href={urls[i]}
            role="button"
            tabIndex={0}
            className="card-title"
            style={{
              color: colors[i],
              cursor: "pointer",
            }}
          >
            <label>{texts[i][0]}</label>
            <div className="card-subtitle">{texts[i][1]}</div>
          </OutboundLink>
        </div>
      </animated.div>
    </animated.div>
  ))
