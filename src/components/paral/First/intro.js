import React from 'react'
import ReactDOM from 'react-dom'
let intro, mobile

export default class Intro extends React.Component {
    componentDidMount() {
        // meta - Three
        intro = ReactDOM.findDOMNode(this.refs.intro)
        window.addEventListener('resize', this.change_font)
        this.change_font()
    }
    // meta - first make

    change_font = () => {
        // check mobile
        if (window.innerHeight > window.innerWidth)
            mobile = true
        else
            mobile = false

        // set ratio
        if (mobile)
            intro.style.fontSize = '18vw'
        else
            intro.style.fontSize = '10vw'
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.change_earth)
    }

    render() {
        return (
            <div style={{ width: '100%', fontFamily: "'Anton', sans-serif", textAlign: "center" }}>
                <span ref="intro" style={{ color: "#fff", fontSize: "10vw" }}>
                    Welcome to <br /> Seong-Land
                </span>
            </div>
        )
    }
}