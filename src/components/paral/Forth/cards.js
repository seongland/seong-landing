import { render } from "react-dom"
import React, { useState } from "react"
import ReactDOM from "react-dom"
import { useSprings, animated, interpolate } from "react-spring"
import { useDrag } from "react-use-gesture"
import "../cards.css"
import Card from "react-animated-3d-card"
import { to, from, trans } from "../../../module"

const cards = [
  "https://www.linkedin.com/in/sungle3737",
  "https://www.instagram.com/seonglaecho",
  "https://www.facebook.com/profile.php?id=100006296858033",
]

const colors = [
  ["#0033bb", "#0022aa", "#2233ee", "#ffffff"],
  ["purple", "#ee1153", "orange", "#ffffff"],
  ["#0066dd", "#0066ff", "#4455ff", "#ffffff"],
]

const texts = [["LinkedIn"], ["Instagram"], ["Facebook"]]

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

function applyVertical() {
  const vertical = isVertical()
  for (const className of classes)
    for (const element of document.getElementsByClassName(className))
      if (vertical) element.classList.add("vertical")
      else element.classList.remove("vertical")
}

export default class Cards extends React.Component {
  componentDidMount() {
    render(<this.Deck />, ReactDOM.findDOMNode(this.refs.cards))
    window.addEventListener("resize", applyVertical)
    setTimeout(() => applyVertical())
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.changeCards)
  }

  Deck() {
    const [gone] = useState(() => new Set())
    const [props, set] = useSprings(cards.length, (i) => ({
      ...to(i),
      from: from(i),
    }))

    const bind = useDrag(
      ({
        args: [index],
        down,
        delta: [xDelta],
        direction: [xDir],
        velocity,
      }) => {
        const trigger = velocity > 0.2
        const dir = xDir < 0 ? -1 : 1
        if (!down && trigger) gone.add(index)
        set((i) => {
          if (index !== i) return
          const isGone = gone.has(index)
          const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0
          const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0)
          const scale = down ? 1.1 : 1
          return {
            x,
            rot,
            scale,
            delay: undefined,
            config: {
              friction: 50,
              tension: down ? 800 : isGone ? 200 : 500,
            },
          }
        })
        if (!down && gone.size === cards.length)
          setTimeout(() => gone.clear() || set((i) => to(i)), 600)
      }
    )

    return props.map(({ x, y, rot, scale }, i) => (
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
          style={{ transform: interpolate([rot, scale], trans) }}
        >
          <Card
            style={{
              background: `linear-gradient(to right, ${colors[i][0]},${colors[i][1]}, ${colors[i][2]})`,
            }}
            onClick={() => (window.dragging ? "" : window.open(cards[i]))}
          >
            <div>
              <img
                className="left top mark absolute"
                src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
              />
              <img
                className="right top mark absolute"
                style={{
                  filter: `brightness(${colors[i][1] === "#ffffff" ? 0.5 : 1})`,
                }}
                src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png"
              />
            </div>
            <div className="card-title-wrapper">
              <div className="card-title" style={{ color: colors[i][3] }}>
                <label>{texts[i][0]}</label>
                <label style={{ marginLeft: "1.5vw" }}>{texts[i][1]}</label>
                <label style={{ marginLeft: "1.5vw" }}>{texts[i][2]}</label>
                <label style={{ marginLeft: "1.5vw" }}>{texts[i][3]}</label>
              </div>
            </div>

            <label
              className="property left absolute"
              style={{ color: colors[i][3] }}
            >
              Card holder
            </label>
            <label
              className="property right absolute"
              style={{ color: colors[i][3] }}
            >
              Expires
            </label>
            <label
              className="absolute bottom left value"
              style={{ color: colors[i][3] }}
            >
              SEONGLAE
            </label>
            <label
              className="absolute bottom right value"
              style={{ color: colors[i][3] }}
            >
              4EVER
            </label>
          </Card>
        </animated.div>
      </animated.div>
    ))
  }

  render() {
    return <div id="card" ref="cards"></div>
  }
}
