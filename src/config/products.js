import React from "react"
import { animated, interpolate } from "react-spring"
import { trans } from "../module/"

export const urls = [
  "https://status.seongland.com",
  "https://live.seongland.com",
  "https://point.seongland.com",
  "https://github.com/seongland/intuiter",
]

const backgrounds = [
  "https://raw.githubusercontent.com/upptime/upptime.js.org/master/static/img/icon.svg",
  "/live.png",
  "/pointland.jpg",
  "/intuiter.png",
]

const fills = ["white", "black", "black", "white"]
const ratio = ["200%", "75%", "150%", "75%"]

const texts = [
  ["Status", "all of my subdomains"],
  ["Live", "of seongland broadcast"],
  ["Pointland", "web metaverse"],
  ["Intuiter", "raise your productivity"],
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
                color: `${fills[i] === "black" ? "white" : "black"}`,
              }}
            >
              {texts[i][0]}
            </label>
            <div
              style={{
                fontSize: "1vw",
                color: `${fills[i] === "black" ? "white" : "black"}`,
              }}
            >
              {texts[i][1]}
            </div>
          </div>
        </div>
      </animated.div>
    </animated.div>
  ))
