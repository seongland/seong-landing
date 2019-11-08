import React from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// todo - select nice font
// todo - remove blue line
// todo - build

var camera, fillLight, renderer, scene, mobile, width, height, earth;
camera = scene = renderer = fillLight = void 0;

export default class Earth extends React.Component {
    componentDidMount() {
        // meta - Three
        window.THREE = THREE
        earth = ReactDOM.findDOMNode(this.refs.earth)
        make_earth()
        window.addEventListener('resize', this.change_earth);

        // meta - first make
        function make_earth() {
            console.log('make start')
            var animate, base, baseMat, geometryBase, highTerran, highTerranMat, light, material, terran, terranGeom, terranHighGeom;
            // check mobile
            if (window.innerHeight > window.innerWidth)
                mobile = true
            else
                mobile = false
            // set ratio
            if (mobile)
                height = window.innerWidth
            else
                height = window.innerWidth / 2
            // set scene
            width = window.innerWidth
            camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
            camera.position.x = -300
            camera.position.y = 555
            camera.position.z = 300
            scene = new THREE.Scene();
            // set sphere
            geometryBase = new THREE.SphereGeometry(400, 30, 56);
            terranGeom = new THREE.SphereGeometry(398, 25, 30);
            terranHighGeom = new THREE.SphereGeometry(390, 25, 20);
            // set material
            baseMat = new THREE.MeshNormalMaterial({
                flatShading: THREE.FlatShading
            });
            material = new THREE.MeshNormalMaterial({
                flatShading: THREE.FlatShading
            });
            highTerranMat = new THREE.MeshNormalMaterial({
                flatShading: THREE.FlatShading
            });
            // make random shape
            geometryBase.vertices.forEach(function (v) {
                return v[["x", "y", "z"][~~(Math.random() * 3)]] += Math.random() * 5;
            });
            [terranHighGeom.vertices, terranGeom.vertices].forEach(function (g) {
                return g.forEach(function (v) {
                    return v[["x", "y", "z"][~~(Math.random() * 3)]] += Math.random() * 20;
                });
            });
            // add mesh by material and sphere
            base = new THREE.Mesh(geometryBase, baseMat);
            terran = new THREE.Mesh(terranGeom, material);
            highTerran = new THREE.Mesh(terranHighGeom, highTerranMat);
            // add mesh
            scene.add(base);
            base.add(terran);
            base.add(highTerran);
            // make light
            light = new THREE.DirectionalLight(0xffffff);
            light.position.set(1, 1, 1);
            fillLight = new THREE.AmbientLight(0x2e1527);
            // add light
            scene.add(light);
            scene.add(fillLight);
            // get renderer
            try {
                renderer = new THREE.WebGLRenderer({
                    alpha: true,
                    antialias: true
                });
            } catch (error) {
                renderer = new THREE.CanvasRenderer();
                alert("come back in chrome or firefox! or enable webgl", error);
            }
            // make control
            var controls = new OrbitControls(camera, renderer.domElement);
            controls.enableZoom = false;
            controls.enablePan = false;
            controls.enableDamping = true;
            controls.maxPolarAngle = Math.PI / 5;
            controls.minPolarAngle = Math.PI / 5;
            controls.update();

            // render
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(width, height);
            earth.appendChild(renderer.domElement);
            animate = function () {
                base.rotation.y += 0.002;
                controls.update()
                requestAnimationFrame(animate);
                return renderer.render(scene, camera);
            };
            console.log('finishied')
            return animate();
        }
    }

    // meta - when window changed
    change_earth = () => {
        // check mobile
        if (window.innerHeight > window.innerWidth)
            mobile = true
        else
            mobile = false
        // set ratio
        if (mobile)
            if (height === window.innerWidth)
                return
            else
                height = window.innerWidth
        else
            if (height === window.innerWidth / 2)
                return
            else
                height = window.innerWidth / 2
        // set scene
        width = window.innerWidth
        camera.aspect = width / height
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        console.log("change finished", camera.position)
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