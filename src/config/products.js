import React from "react"
import { animated, interpolate } from "react-spring"
import { trans } from "../module/"

export const urls = [
  "https://status.seongland.com",
  "https://live.seongland.com",
  "https://github.com/seongland/intuiter",
  "https://account.seongland.com",
  "https://point.seongland.com",
]

const backgrounds = [
  "/upptime.svg",
  "/live.png",
  "/intuiter.png",
  "/seongland.svg",
  "/pointland.jpg",
]

const fills = ["white", "black", "white", "#242526", "black"]
const colors = ["black", "white", "black", "#fff", "white"]
const ratio = ["200%", "75%", "75%", "50%", "150%"]

const texts = [
  ["Status", "all of my subdomains"],
  ["Live", "of seongland broadcast"],
  ["Intuiter", "raise your productivity"],
  ["Account", "of seongland services"],
  ["Pointland", "web metaverse"],
]

export const products = (props, bind) =>
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
        onClick={() => window.open(urls[i])}
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
          <div className="card-title">
            <label
              style={{
                color: colors[i],
              }}
            >
              {texts[i][0]}
            </label>
            <div
              className="card-subtitle"
              style={{
                color: colors[i],
              }}
            >
              {texts[i][1]}
            </div>
          </div>
        </div>
      </animated.div>
    </animated.div>
  ))
