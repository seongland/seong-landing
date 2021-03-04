import { render } from "react-dom"
import React, { useState } from "react"
import ReactDOM from "react-dom"
import { useSprings, animated, interpolate } from "react-spring"
import { useDrag } from "react-use-gesture"
import "../cards.css"
import Card from "react-animated-3d-card"
import { to, from, trans } from "../../../module"

const cards = [
  "https://www.instagram.com/seonglaecho",
  "https://www.facebook.com/profile.php?id=100006296858033",
  "https://www.linkedin.com/in/sungle3737",
  "https://github.com/sungle3737",
  "https://doc.seongland.com",
]

const colors = [
  ["purple", "#ee1153", "orange", "#ffffff"],
  ["#0066dd", "#0066ff", "#4455ff", "#ffffff"],
  ["#0033bb", "#0022aa", "#2233ee", "#ffffff"],
  ["#0f0c29", "#302b63", "#24243e", "#fff"],
  ["#020202", "#333333", "#222222", "#fff"],
]

const texts = [
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
      fill="#5599ff"
      viewBox="-6 -6 34 34"
    >
      <path d="M15.12,5.32H17V2.14A26.11,26.11,0,0,0,14.26,2C11.54,2,9.68,3.66,9.68,6.7V9.32H6.61v3.56H9.68V22h3.68V12.88h3.06l.46-3.56H13.36V7.05C13.36,6,13.64,5.32,15.12,5.32Z" />
    </svg>,
    "Facebook",
  ],
  [
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#443388">
      <path d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z" />
    </svg>,
    "Github",
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
              background: `linear-gradient(to right, ${colors[i][0]},${colors[i][1]}, ${colors[i][2]})`,
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
                style={{
                  filter: `brightness(${colors[i][1] === "#ffffff" ? 0.5 : 1})`,
                }}
                src="/visa.png"
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
