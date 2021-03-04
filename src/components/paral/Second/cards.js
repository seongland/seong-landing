import { render } from "react-dom"
import React, { useState } from "react"
import ReactDOM from "react-dom"
import { useSprings, animated, interpolate } from "react-spring"
import { useDrag } from "react-use-gesture"
import "../cards.css"
import Card from "react-animated-3d-card"
import { to, from, trans } from "../../../module"

const cards = ["https://point.seongland.com"]

const backgrounds = ["/pointland.png", "/pointland.png"]

const texts = [
  [
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#443388">
      <path d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z" />
    </svg>,
    "Pointland",
  ],
  [
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
      <path
        fill="#aaaaaa"
        d="M28.4602 9.06842L11.8104 10.2936C10.4679 10.4098 10 11.285 10 12.3342V30.5316C10 31.3492 10.2916 32.048 10.993 32.982L14.9069 38.0563C15.5498 38.8734 16.134 39.0482 17.3616 38.9897L36.6969 37.823C38.3322 37.7069 38.8 36.9481 38.8 35.665V15.1925C38.8 14.5292 38.5374 14.3376 37.7632 13.7728C37.7206 13.7418 37.6764 13.7096 37.6307 13.6761L32.3159 9.94338C31.0308 9.01056 30.5048 8.89318 28.4602 9.06842ZM17.8 14.8567C16.2214 14.9632 15.8627 14.9874 14.9662 14.2596L12.6865 12.4516C12.454 12.2178 12.5706 11.9262 13.1544 11.8683L29.1613 10.7017C30.5045 10.5848 31.2054 11.0522 31.7314 11.4602L34.4769 13.4435C34.5938 13.5016 34.8854 13.8511 34.5347 13.8511L18.0038 14.843L17.8 14.8567ZM15.9587 35.4897V18.1093C15.9587 17.3512 16.1924 17.001 16.893 16.9421L35.8782 15.8343C36.5222 15.776 36.8138 16.1846 36.8138 16.9421V34.206C36.8138 34.9648 36.6966 35.6072 35.6447 35.665L17.4773 36.7155C16.4259 36.7733 15.9587 36.4238 15.9587 35.4897ZM33.8936 19.0416C34.0101 19.5671 33.8936 20.092 33.3668 20.1511L32.4914 20.3254V33.1567C31.7314 33.5649 31.0306 33.7983 30.4466 33.7983C29.5116 33.7983 29.2774 33.5064 28.5771 32.632L22.8513 23.65V32.3404L24.6631 32.7489C24.6631 32.7489 24.6631 33.7983 23.2014 33.7983L19.1716 34.0319C19.0545 33.7983 19.1716 33.2155 19.5803 33.0987L20.6319 32.8075V21.3172L19.1718 21.2003C19.0547 20.6749 19.3463 19.9173 20.1648 19.8585L24.4879 19.5673L30.4466 28.6662V20.617L28.9274 20.4428C28.8107 19.8004 29.2774 19.334 29.8617 19.2761L33.8936 19.0416Z"
      />
    </svg>,
    "Notion",
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
            ),
          }}
        >
          <animated.div
            {...bind(i)}
            style={{ transform: interpolate([rot, scale], trans) }}
          >
            <Card
              style={{
                background: `${backgrounds[i]}`,
              }}
              onClick={() => (window.dragging ? "" : window.open(cards[i]))}
            >
              <div>
                <img
                  className="left top mark absolute"
                  src="/chip.png"
                />
                <img
                  className="right top mark absolute"
                  src="/visa.png"
                />
              </div>
              <div className="card-title-wrapper">
                <div className="card-title">
                  <label>{texts[i][0]}</label>
                  <label>{texts[i][1]}</label>
                </div>
              </div>

              <label className="property left absolute">Card holder</label>
              <label className="property right absolute">Expires</label>
              <label className="absolute bottom left value">SEONGLAE</label>
              <label className="absolute bottom right value">4EVER</label>
            </Card>
          </animated.div>
        </animated.div>
      ))
    }
    render(<Deck />, ReactDOM.findDOMNode(this.refs.cards))
  }

  render() {
    return <div id="card" ref="cards" />
  }
}
