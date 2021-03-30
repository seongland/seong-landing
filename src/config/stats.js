import React from "react"
import { animated, interpolate } from "react-spring"
import { trans } from "../module/"

export const urls = [
  "https://vizydrop.com/shared/drop/5e3ea0f1b56e7c81523f39aa?authkey=85cc6617d521fe9b38a9",
]

export const stats = (props, bind) =>
  props.map(({ x, y, rot, scale }, i) => (
    <animated.div
      key={i}
      style={{
        transform: interpolate(
          [x, y],
          (x, y) => `translate3d(${x}px,${y}px,0)`
        ),
      }}
    >
      <animated.div
        {...bind(i)}
        className="iframe"
        style={{
          transform: interpolate([rot, scale], trans),
        }}
      >
        <iframe
          title="vizydrop"
          style={{
            width: "80%",
            height: " 70vh",
            marginLeft: "10%",
            marginRight: "10%",
            border: "none",
          }}
          src={urls[i]}
        />
      </animated.div>
    </animated.div>
  ))
