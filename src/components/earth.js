import React from "react"
import ReactDOM from "react-dom"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default class Earth extends React.Component {
  camera
  scene
  renderer
  controls
  camera
  renderer
  scene
  width
  height
  base
  componentDidMount() {
    this.makeEarth()
    window.addEventListener("resize", this.changeEarth)
  }

  // meta - first make
  makeEarth() {
    this.setRatio()
    this.makeCamera()
    this.makeScene()
    this.makeRenderer()
    this.makeControl()
    ReactDOM.findDOMNode(this.refs.earth).appendChild(this.renderer.domElement)

    const animate = () => {
      this.base.rotation.y += 0.002
      this.controls.update()
      requestAnimationFrame(animate)
      return this.renderer.render(this.scene, this.camera)
    }
    return animate()
  }

  checkMobile = () => window.innerHeight > window.innerWidth

  setRatio() {
    if (this.checkMobile())
      if (this.width === window.innerWidth) return
      else {
        this.height = window.innerWidth * this.props.ratios[0]
        this.width = window.innerWidth * this.props.ratios[0]
        return
      }
    if (this.height === window.innerWidth * this.props.ratios[1]) return
    this.height = window.innerWidth * this.props.ratios[1]
    this.width = this.height
  }

  makeCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      1,
      10000
    )
    this.camera.position.x = -300
    this.camera.position.y = 555
    this.camera.position.z = 300
  }

  makeScene() {
    let baseMat,
      geometryBase,
      highTerran,
      highTerranMat,
      terranMat,
      terran,
      terranGeom,
      terranHighGeom,
      fillLight,
      light,
      round,
      all
    this.scene = new THREE.Scene()
    geometryBase = new THREE.SphereGeometry(400, 30, 56)
    terranGeom = new THREE.SphereGeometry(398, 25, 30)
    terranHighGeom = new THREE.SphereGeometry(390, 25, 20)

    all = [baseMat, terranMat, highTerranMat]
    all.forEach(material => {
      material = new THREE.MeshNormalMaterial({
        flatShading: THREE.FlatShading,
      })
    })
    baseMat = new THREE.MeshNormalMaterial({
      flatShading: THREE.FlatShading,
    })
    terranMat = new THREE.MeshNormalMaterial({
      flatShading: THREE.FlatShading,
    })
    highTerranMat = new THREE.MeshNormalMaterial({
      flatShading: THREE.FlatShading,
    })

    round = [
      terranHighGeom.attributes.position.array,
      terranGeom.attributes.position.array,
    ]
    for (const index in geometryBase.attributes.position.array)
      geometryBase.attributes.position.array[index] += Math.random() * 5
    for (const position of round)
      for (const index in position) position[index] += Math.random() * 20

    this.base = new THREE.Mesh(geometryBase, baseMat)
    terran = new THREE.Mesh(terranGeom, terranMat)
    highTerran = new THREE.Mesh(terranHighGeom, highTerranMat)
    light = new THREE.DirectionalLight(0xffffff)
    light.position.set(1, 1, 1)
    fillLight = new THREE.AmbientLight(0x2e1527)
    this.scene.add(this.base)
    this.base.add(terran)
    this.base.add(highTerran)
    this.scene.add(light)
    this.scene.add(fillLight)
  }

  makeRenderer() {
    try {
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      })
    } catch (error) {
      this.renderer = new THREE.CanvasRenderer()
      alert("come back in chrome or whale! or enable webgl", error)
    }
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.width, this.height)
    this.renderer.domElement.style.outline = "none"
  }

  makeControl() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableZoom = false
    this.controls.enablePan = false
    this.controls.enableDamping = true
    this.controls.maxPolarAngle = Math.PI / 5
    this.controls.minPolarAngle = Math.PI / 5
    this.controls.update()
  }

  // meta - when window changed
  changeEarth = () => {
    this.setRatio()
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.width, this.height)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.changeEarth)
  }

  render() {
    return <div ref="earth" />
  }
}
