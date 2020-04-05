import React from 'react'
import ReactDOM from 'react-dom'
import Proton from "proton-engine"
import { RAFManager } from './manager.js' 

let canvas, context, proton, renderer, emitter, velocity, span

const radius = [1, 3]
const mass = 100
const life = [1, 1.2]

export default class Protons extends React.Component {
  componentDidMount() {
    // meta - Three
    proton = ReactDOM.findDOMNode(this.refs.proton)
    window.addEventListener('resize', this.change_proton)
    this.make()
  }

  make = () => {
    this.initCanvas()
    this.createProton()
    render()

    function render() {
      RAFManager.add(() => {
        proton.update()
      })
    }
  }

  initCanvas = () =>{
    canvas = document.getElementById("canvas")
    canvas.width = window.innerWidth
    canvas.height = 3 * canvas.width
    context = canvas.getContext("2d")

    window.onresize = function (e) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      emitter.p.x = canvas.width / 2
      emitter.p.y = canvas.height / 2
    }
  }

  createProton = () =>{
    proton = new Proton()
    emitter = new Proton.Emitter()
    emitter.rate = new Proton.Rate(
      new Proton.Span(5, 10),
      new Proton.Span(0.1, 0.3)
    )
    emitter.addInitialize(new Proton.Mass(mass))
    emitter.addInitialize(new Proton.Radius(...radius))
    emitter.addInitialize(new Proton.Life(...life))
    span = new Proton.Span()
    this.change_span()
    
    velocity = new Proton.Velocity(
      span,
      new Proton.Span(-300, 300),
      "polar"
    )
    emitter.addInitialize(velocity)
    emitter.addBehaviour(new Proton.RandomDrift(30, 30, 0.05))
    emitter.addBehaviour(new Proton.Scale(1, 0.7))
    emitter.p.x = canvas.width / 2
    emitter.p.y = canvas.height / 2
    emitter.emit()

    proton.addEmitter(emitter)
    renderer = new Proton.CanvasRenderer(canvas)
    renderer.onProtonUpdate = () => {
      context.fillStyle = "rgba(53, 53, 53, 0.4)"
      context.fillRect(0, 0, canvas.width, canvas.height)
    }
    proton.addRenderer(renderer)
  }

  change_span = () => {
    if (canvas.width > canvas.height){
      span.a = 1
      span.b = 1
      return
    }
    span.a = canvas.height / 300
    span.b = canvas.height / 300
  }

  // meta - when window changed
  change_proton = () => {
    canvas.width = window.innerWidth
    canvas.height = canvas.width * 3
    emitter.p.x = canvas.width / 2
    emitter.p.y = canvas.height / 2
    this.change_span()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.change_proton)
  }

  render() {
    return (
      <canvas id="canvas" ref='proton'></canvas>
    )
  }
}