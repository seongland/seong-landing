import React from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let controls, camera, renderer, scene, width, height, base;
camera = scene = renderer = void 0;

export default class Earth extends React.Component {
  componentDidMount() {
    this.makeEarth()
    window.addEventListener('resize', this.change_earth);
  }

  // meta - first make
  makeEarth = () => {
    window.THREE = THREE
    this.setRatio()
    this.makeCamera()
    this.makeScene()
    this.makeRenderer()
    this.makeControl()
    ReactDOM.findDOMNode(this.refs.earth).appendChild(renderer.domElement);

    var animate = function () {
      base.rotation.y += 0.002;
      controls.update()
      requestAnimationFrame(animate);
      return renderer.render(scene, camera);
    };
    return animate();
  }

  checkMobile = () => {
    if (window.innerHeight > window.innerWidth)
      return true
    return false
  }

  setRatio = () => {
    if (this.checkMobile())
      if (width === window.innerWidth)
        return
      else {
        height = window.innerWidth
        width = window.innerWidth
        return
      }
    if (height === window.innerWidth / 2)
      return
    height = window.innerWidth / 2
    width = height
  }

  makeCamera = () => {
    camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
    camera.position.x = -300
    camera.position.y = 555
    camera.position.z = 300
  }

  makeScene = () => {
    var baseMat, geometryBase, highTerran, highTerranMat, terranMat, terran, terranGeom, terranHighGeom, fillLight, light;
    scene = new THREE.Scene();
    geometryBase = new THREE.SphereGeometry(400, 30, 56);
    terranGeom = new THREE.SphereGeometry(398, 25, 30);
    terranHighGeom = new THREE.SphereGeometry(390, 25, 20);
    baseMat = new THREE.MeshNormalMaterial({
      flatShading: THREE.FlatShading
    });
    terranMat = new THREE.MeshNormalMaterial({
      flatShading: THREE.FlatShading
    });
    highTerranMat = new THREE.MeshNormalMaterial({
      flatShading: THREE.FlatShading
    });
    geometryBase.vertices.forEach(function (v) {
      return v[["x", "y", "z"][~~(Math.random() * 3)]] += Math.random() * 5;
    });
    [terranHighGeom.vertices, terranGeom.vertices].forEach(function (g) {
      return g.forEach(function (v) {
        return v[["x", "y", "z"][~~(Math.random() * 3)]] += Math.random() * 20;
      });
    });
    base = new THREE.Mesh(geometryBase, baseMat);
    terran = new THREE.Mesh(terranGeom, terranMat);
    highTerran = new THREE.Mesh(terranHighGeom, highTerranMat);
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    fillLight = new THREE.AmbientLight(0x2e1527);
    scene.add(base);
    base.add(terran);
    base.add(highTerran);
    scene.add(light);
    scene.add(fillLight);
  }

  makeRenderer = () => {
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
      });
    } catch (error) {
      renderer = new THREE.CanvasRenderer();
      alert("come back in chrome or whale! or enable webgl", error);
    }
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.domElement.style.outline = 'none'
  }

  makeControl = () => {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.maxPolarAngle = Math.PI / 5;
    controls.minPolarAngle = Math.PI / 5;
    controls.update();
  }

  // meta - when window changed
  change_earth = () => {
    this.set_ratio()
    camera.aspect = width / height
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.change_earth);
  }

  render() {
    return (
      <div ref="earth"></div>
    );
  }
}