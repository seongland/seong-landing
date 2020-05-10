import React from "react"
import ReactDOM from "react-dom"
import Typed from "react-typed"

let intro, mobile

export default class Intro extends React.Component {
  componentDidMount() {
    // meta - Three
    intro = ReactDOM.findDOMNode(this.refs.intro)
    window.addEventListener("resize", this.change_font)
    this.change_font()
  }
  // meta - first make

  change_font = () => {
    // check mobile
    if (window.innerHeight > window.innerWidth) mobile = true
    else mobile = false

    // set ratio
    if (mobile) intro.style.fontSize = "18vw"
    else intro.style.fontSize = "10vw"
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.change_earth)
  }

  render() {
    return (
      <div
        ref="intro"
        style={{
          width: "100%",
          fontFamily: "'Anton', sans-serif",
          textAlign: "center",
        }}
      >
        <Typed
          loop
          style={{ color: "#fff" }}
          strings={[
            "Welcome to Seong-Land",
            "Welcome to Seong-Land",
            "Visit my Other Lands",
            "Visit my Other Lands",
            "Get my Awesome Apps",
            "Get my Awesome Apps"
          ]}
          typeSpeed={50}
          backSpeed={40}
        />

        <typed typeSpeed={40} backSpeed={50} attr="placeholder" loop>
          <input type="text" />
        </typed>
      </div>
    )
  }
}
