import { render } from "react-dom"
import React, { useState } from "react"
import ReactDOM from "react-dom"
import { useSprings, animated, interpolate } from "react-spring"
import { useDrag } from "react-use-gesture"
import "../cards.css"
import { to, from, trans } from "../../../module"

const cards = ["https://status.seongland.com", "https://live.seongland.com", "https://point.seongland.com", "https://github.com/seongland/intuiter"]

const backgrounds = ["https://raw.githubusercontent.com/upptime/upptime.js.org/master/static/img/icon.svg", "/live.png", "/pointland.gif", "/intuiter.png"]

const fills = ["white", "black", "black", "white"]
const ratio = ["200%", "75%", "150%", "75%"]

const texts = [
  [
    "Status", "all of my subdomains"
  ],
  [
    "Live", "of seongland broadcast"
  ],
  [
    "Pointland", "web metaverse"
  ],
  [
    "Intuiter", "raise your productivity"
  ],
]

export default class Cards extends React.Component {
  componentDidMount() {
    function Deck() {
      const [gone] = useState(() => new Set())
      const [props, set] = useSprings(cards.length, i => ({
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
          set(i => {
            if (index !== i) return
            const isGone = gone.has(index)
            const x = isGone
              ? (200 + window.innerWidth) * dir
              : down
                ? xDelta
                : 0
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
            setTimeout(() => gone.clear() || set(i => to(i)), 600)
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
            )
          }}
        >
          <animated.div
            {...bind(i)}
            style={{
              background: `${fills[i]}`,
              width: "60%",
              height: " 60vh",
              marginLeft: "20%",
              marginRight: "20%",
              border: "none",
              overflow: "hidden",
              transform: interpolate([rot, scale], trans),
            }}
            onClick={e => {
              if (e.ctrlKey) window.open(cards[i])
              else window.location.href = cards[i]
            }}
          >
            <div className="card-title-wrapper"
              style={{
                background: `url("${backgrounds[i]}")`,
                backgroundPosition: "center center",
                backgroundSize: `auto ${ratio[i]}`,
                backgroundRepeat: "no-repeat",
              }}>
              <div className="card-title">
                <label style={{
                  color: `${fills[i] === 'black' ? 'white' : 'black'}`,
                }}>{texts[i][0]}</label>
                <div style={{
                  fontSize: "1vw",
                  color: `${fills[i] === 'black' ? 'white' : 'black'}`,
                }}>{texts[i][1]}</div>
              </div>
            </div>
          </animated.div>
        </animated.div >
      ))
    }
    render(<Deck />, ReactDOM.findDOMNode(this.refs.cards))
  }

  render() {
    return <div id="card" ref="cards" />
  }
}
