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

const isVertical = () => {
  if (window.innerHeight > window.innerWidth) return true
  return false
}

export default class Cards extends React.Component {
  componentDidMount() {
    render(<this.Deck />, ReactDOM.findDOMNode(this.refs.cards))
    window.addEventListener("resize", this.changeCards)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.changeCards)
  }

  changeCards = () => {
    const vertical = isVertical()
    for (const card of document.getElementsByClassName(
      "parallax-card-layers"
    )) {
      if (vertical) {
        card.style.width = "80vw"
        card.style.height = "50vw"
      } else {
        card.style.width = "40vw"
        card.style.height = "25vw"
      }
    }
    for (const card of document.getElementsByClassName("card-title")) {
      if (vertical) card.style.fontSize = "5vw"
      else card.style.fontSize = "2.5vw"
    }
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
            (x, y) => `translate3d(${x}vw,${y}vw,0)`
          ),
        }}
      >
        <animated.div
          {...bind(i)}
          style={{
            transform: interpolate([rot, scale], trans),
          }}
        >
          <Card
            style={{
              background: `linear-gradient(to right, ${colors[i][0]},${colors[i][1]}, ${colors[i][2]})`,
              width: window.innerHeight > window.innerWidth ? "80vw" : "40vw",
              height: window.innerHeight > window.innerWidth ? "50vw" : "25vw",
              cursor: "pointer",
            }}
            onClick={(e) => {
              if (!window.dragging) window.open(cards[i])
            }}
          >
            <div>
              <img
                style={{
                  position: "absolute",
                  left: "2vw",
                  top: "2vw",
                  height: "4vw",
                }}
                src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
              ></img>
              <img
                style={{
                  position: "absolute",
                  right: "2vw",
                  top: "2vw",
                  height: "4vw",
                  filter: `brightness(${colors[i][1] === "#ffffff" ? 0.5 : 1})`,
                }}
                src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png"
              ></img>
            </div>
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="card-title"
                style={{
                  fontSize:
                    window.innerHeight > window.innerWidth ? "5vw" : "2vw",
                  fontFamily: "Malgun Gothic",
                  color: colors[i][3],
                }}
              >
                <label style={{ fontWeight: "bold" }}>{texts[i][0]}</label>
                <label style={{ marginLeft: "1.5vw", fontWeight: "bold" }}>
                  {texts[i][1]}
                </label>
                <label style={{ marginLeft: "1.5vw", fontWeight: "bold" }}>
                  {texts[i][2]}
                </label>
                <label style={{ marginLeft: "1.5vw", fontWeight: "bold" }}>
                  {texts[i][3]}
                </label>
              </div>
            </div>
            <div>
              <label
                style={{
                  color: colors[i][3],
                  position: "absolute",
                  bottom: "4vw",
                  left: "2vw",
                  fontSize: "1vw",
                  opacity: 0.5,
                }}
              >
                Card holder
              </label>
              <label
                style={{
                  color: colors[i][3],
                  position: "absolute",
                  bottom: "4vw",
                  right: "2vw",
                  fontSize: "1vw",
                  opacity: 0.5,
                }}
              >
                Expires
              </label>
            </div>

            <div>
              <label
                style={{
                  color: colors[i][3],
                  position: "absolute",
                  bottom: "2vw",
                  left: "2vw",
                  opacity: 1,
                  fontSize: "1.5vw",
                }}
              >
                SEONGLAE
              </label>
              <label
                style={{
                  color: colors[i][3],
                  position: "absolute",
                  bottom: "2vw",
                  right: "2vw",
                  opacity: 1,
                  fontSize: "1.5vw",
                }}
              >
                4EVER
              </label>
            </div>
          </Card>
        </animated.div>
      </animated.div>
    ))
  }

  render() {
    return <div id="card" ref="cards"></div>
  }
}
