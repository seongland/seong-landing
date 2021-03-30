import React from "react"
import { animated, interpolate } from "react-spring"
import { trans } from "../module/"
import { OutboundLink } from "gatsby-plugin-google-gtag"

export const urls = ["https://github.com/seongland/intuiter"]

const backgrounds = ["/intuiter.png"]

const fills = ["white"]
const colors = ["black"]
const ratio = ["75%"]

const texts = [["Intuiter", "raise your productivity"]]

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
            tabIndex={i}
            className="card-title"
            style={{
              color: colors[i],
            }}
          >
            <label
              style={{
                cursor: "pointer",
                color: colors[i],
              }}
            >
              {texts[i][0]}
            </label>
            <div
              className="card-subtitle"
              style={{ cursor: "pointer", color: colors[i] }}
            >
              {texts[i][1]}
            </div>
          </OutboundLink>
        </div>
      </animated.div>
    </animated.div>
  ))
