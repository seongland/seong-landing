import { render } from "react-dom"
import React, { useState } from "react"
import ReactDOM from "react-dom"
import { useSprings, animated, interpolate } from "react-spring"
import { useDrag } from "react-use-gesture"
import "../cards.css"
import Card from "react-animated-3d-card"

const cards = ["https://github.com/sungle3737", "https://doc.seongland.com"]

const colors = [
  ["#0f0c29", "#302b63", "#24243e"],
  ["#020202", "#333333", "#222222"],
]

const texts = [
  ["My", "Programming", "History"],
  ["Personal", "Wiki"],
]

const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -5 + Math.random() * 10,
  delay: i * 100,
})

const from = (i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })

const trans = (r, s) =>
  `perspective(1500px) rotateX(10deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`

function Deck() {
  const [gone] = useState(() => new Set())
  const [props, set] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  }))

  const bind = useDrag(
    ({ args: [index], down, delta: [xDelta], direction: [xDir], velocity }) => {
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
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        }
      })
      if (!down && gone.size === cards.length)
        setTimeout(() => gone.clear() || set((i) => to(i)), 600)
    }
  )

  return props.map(({ x, y, rot, scale }, i) => (
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
        style={{
          transform: interpolate([rot, scale], trans),
        }}
      >
        <div>
          {cards[i].includes("vizydrop") ? (
            <iframe
              style={{
                height: "50vh",
                width: "80%",
                marginLeft: "10%",
                marginRight: "10%",
                border: "none",
              }}
              src={cards[i]}
            ></iframe>
          ) : (
            <Card
              style={{
                background: `linear-gradient(to right, ${colors[i][0]},${colors[i][1]}, ${colors[i][2]})`,
                width: "80vw",
                height: "30vh",
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
                    left: "25px",
                    top: "25px",
                    height: "50px",
                  }}
                  src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
                ></img>
                <img
                  style={{
                    position: "absolute",
                    right: "25px",
                    top: "25px",
                    height: "50px",
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
                  style={{
                    fontSize: "30px",
                    fontFamily: "Fira Code",
                    color: "white",
                  }}
                >
                  <label style={{ fontWeight: "bold" }}>{texts[i][0]}</label>
                  <label style={{ marginLeft: "15px", fontWeight: "bold" }}>
                    {texts[i][1]}
                  </label>
                  <label style={{ marginLeft: "15px", fontWeight: "bold" }}>
                    {texts[i][2]}
                  </label>
                  <label style={{ marginLeft: "15px", fontWeight: "bold" }}>
                    {texts[i][3]}
                  </label>
                </div>
              </div>
              <div>
                <label
                  style={{
                    color: "white",
                    position: "absolute",
                    bottom: "60px",
                    left: "25px",
                    opacity: 0.5,
                  }}
                >
                  Card holder
                </label>
                <label
                  style={{
                    color: "white",
                    position: "absolute",
                    bottom: "60px",
                    right: "25px",
                    opacity: 0.5,
                  }}
                >
                  Expires
                </label>
              </div>

              <div>
                <label
                  style={{
                    color: "white",
                    position: "absolute",
                    bottom: "25px",
                    left: "25px",
                    opacity: 1,
                    fontSize: "25px",
                  }}
                >
                  Seonglae
                </label>
                <label
                  style={{
                    color: "white",
                    position: "absolute",
                    bottom: "25px",
                    right: "25px",
                    opacity: 1,
                    fontSize: "25px",
                  }}
                >
                  4ever
                </label>
              </div>
            </Card>
          )}
        </div>
      </animated.div>
    </animated.div>
  ))
}

export default class Cards extends React.Component {
  componentDidMount() {
    render(<Deck />, ReactDOM.findDOMNode(this.refs.cards))
  }

  render() {
    return <div id="card" ref="cards"></div>
  }
}
