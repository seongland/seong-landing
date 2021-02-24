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

const texts = [
  [
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g data-name="Brand Logos">
        <path
          fill="#0055ff"
          d="M5.00351,7H4.97535a2.23465,2.23465,0,1,1,.05658-4.45706A2.23549,2.23549,0,1,1,5.00351,7Z"
        />
        <rect width="4" height="12" x="3.018" y="10" fill="#0055ff" />
        <path
          fill="#0055ff"
          d="M17.51754,10a4.47251,4.47251,0,0,0-3.5,1.70343V10h-4V22h4V16.5a2,2,0,0,1,4,0V22h4V14.5A4.5,4.5,0,0,0,17.51754,10Z"
        />
      </g>
    </svg>,
    "LinkedIn",
  ],
  [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      fill="#ff8899"
      viewBox="-6 -6 34 34"
    >
      <path d="M17.34,5.46h0a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,17.34,5.46Zm4.6,2.42a7.59,7.59,0,0,0-.46-2.43,4.94,4.94,0,0,0-1.16-1.77,4.7,4.7,0,0,0-1.77-1.15,7.3,7.3,0,0,0-2.43-.47C15.06,2,14.72,2,12,2s-3.06,0-4.12.06a7.3,7.3,0,0,0-2.43.47A4.78,4.78,0,0,0,3.68,3.68,4.7,4.7,0,0,0,2.53,5.45a7.3,7.3,0,0,0-.47,2.43C2,8.94,2,9.28,2,12s0,3.06.06,4.12a7.3,7.3,0,0,0,.47,2.43,4.7,4.7,0,0,0,1.15,1.77,4.78,4.78,0,0,0,1.77,1.15,7.3,7.3,0,0,0,2.43.47C8.94,22,9.28,22,12,22s3.06,0,4.12-.06a7.3,7.3,0,0,0,2.43-.47,4.7,4.7,0,0,0,1.77-1.15,4.85,4.85,0,0,0,1.16-1.77,7.59,7.59,0,0,0,.46-2.43c0-1.06.06-1.4.06-4.12S22,8.94,21.94,7.88ZM20.14,16a5.61,5.61,0,0,1-.34,1.86,3.06,3.06,0,0,1-.75,1.15,3.19,3.19,0,0,1-1.15.75,5.61,5.61,0,0,1-1.86.34c-1,.05-1.37.06-4,.06s-3,0-4-.06A5.73,5.73,0,0,1,6.1,19.8,3.27,3.27,0,0,1,5,19.05a3,3,0,0,1-.74-1.15A5.54,5.54,0,0,1,3.86,16c0-1-.06-1.37-.06-4s0-3,.06-4A5.54,5.54,0,0,1,4.21,6.1,3,3,0,0,1,5,5,3.14,3.14,0,0,1,6.1,4.2,5.73,5.73,0,0,1,8,3.86c1,0,1.37-.06,4-.06s3,0,4,.06a5.61,5.61,0,0,1,1.86.34A3.06,3.06,0,0,1,19.05,5,3.06,3.06,0,0,1,19.8,6.1,5.61,5.61,0,0,1,20.14,8c.05,1,.06,1.37.06,4S20.19,15,20.14,16ZM12,6.87A5.13,5.13,0,1,0,17.14,12,5.12,5.12,0,0,0,12,6.87Zm0,8.46A3.33,3.33,0,1,1,15.33,12,3.33,3.33,0,0,1,12,15.33Z" />
    </svg>,
    "Instagram",
  ],
  [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      fill="#5599ff"
      viewBox="-6 -6 34 34"
    >
      <path d="M15.12,5.32H17V2.14A26.11,26.11,0,0,0,14.26,2C11.54,2,9.68,3.66,9.68,6.7V9.32H6.61v3.56H9.68V22h3.68V12.88h3.06l.46-3.56H13.36V7.05C13.36,6,13.64,5.32,15.12,5.32Z" />
    </svg>,
    "Facebook",
  ],
]

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
                <label>{texts[i][1]}</label>
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
