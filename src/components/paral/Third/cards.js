import { render } from "react-dom"
import React from "react"
import ReactDOM from "react-dom"
import { animated, interpolate } from "react-spring"
import "../cards.css"
import { trans, Deck } from "../../../module"

const cards = [
  "https://vizydrop.com/shared/drop/5e3ea0f1b56e7c81523f39aa?authkey=85cc6617d521fe9b38a9",
]

const deck = (props, bind) =>
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
          style={{
            width: "80%",
            height: " 70vh",
            marginLeft: "10%",
            marginRight: "10%",
            border: "none",
          }}
          src={cards[i]}
        ></iframe>
      </animated.div>
    </animated.div>
  ))

export default class Cards extends React.Component {
  componentDidMount = () =>
    render(
      <Deck deck={deck} cards={cards} />,
      ReactDOM.findDOMNode(this.refs.cards)
    )
  render = () => <div id="card" ref="cards" />
}
