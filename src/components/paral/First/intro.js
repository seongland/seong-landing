import React, { Suspense } from "react"
import ReactDOM from "react-dom"

const Typed = React.lazy(() => import("react-typed"))

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
    if (mobile) intro.style.fontSize = "9vw"
    else intro.style.fontSize = "5vw"
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.changeEarth)
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
        <Suspense fallback={<div></div>}>
          <Typed
            style={{ color: "#fff" }}
            strings={[
              "Welcome to Seong-Land",
              "Welcome to Seong-Land",
              "You can",
              "Spin the Earth",
              "Visit awesome projects",
              "Visit awesome projects",
              "All that things are below",
              "All that things are below",
              "Try Swipe Cards",
              "Anyway, Welcome",
              "Anyway, Welcome",
              "Seong-Land",
            ]}
            typeSpeed={60}
            backSpeed={50}
          />
        </Suspense>
      </div>
    )
  }
}
