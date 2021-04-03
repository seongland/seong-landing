import React, { Suspense } from "react"
import "./cards.css"
import { Deck } from "../module/index.jsx"

export default class Cards extends React.Component {
  render() {
    return (
      <div id="card">
        <Suspense fallback={<div></div>}>
          <Deck deck={this.props.deck} urls={this.props.urls} />
        </Suspense>
      </div>
    )
  }
}
