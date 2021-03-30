import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import Typed from "react-typed"
export default class Intro extends React.Component {
  intro
  mobile
  timeout
  state = { show: false }

  componentDidMount() {
    this.intro = ReactDOM.findDOMNode(this.refs.intro)
    window.addEventListener("resize", this.changeFont)
    this.changeFont()
    this.timeout = setTimeout(() => this.setState({ show: true }), 1500)
  }

  changeFont = () => {
    if (window.innerHeight > window.innerWidth) this.mobile = true
    else this.mobile = false
    if (this.mobile) this.intro.style.fontSize = "9vw"
    else this.intro.style.fontSize = "5vw"
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
    window.removeEventListener("resize", this.changeFont)
  }

  render() {
    return this.state.show ? (
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
    ) : (
      <div ref="intro" />
    )
  }
}
