import React from 'react';
import ReactDOM from 'react-dom';
import Stats from "stats.js";
import Proton from "proton-engine";

let stats, canvas, context, proton, renderer, emitter;

export default class Protons extends React.Component {
  componentDidMount() {
    // meta - Three
    proton = ReactDOM.findDOMNode(this.refs.proton)
    make_proton()
    window.addEventListener('resize', this.change_proton);

    // meta - first make
    function make_proton() {
      initCanvas();
      initStats();
      createProton();
      render();
    }

    function initCanvas() {
      canvas = document.getElementById("canvas");
      canvas.width = window.innerWidth;
      canvas.height = 3 * canvas.width;
      context = canvas.getContext("2d");

      window.onresize = function (e) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        emitter.p.x = canvas.width / 2;
        emitter.p.y = canvas.height / 2;
      };
    }

    function initStats() {
      stats = new Stats();
      stats.setMode(2);
      stats.domElement.style.position = "absolute";
      stats.domElement.style.left = "0px";
      stats.domElement.style.top = "0px";
      document.body.appendChild(stats.domElement);
    }

    function createProton() {
      proton = new Proton();
      emitter = new Proton.Emitter();
      emitter.rate = new Proton.Rate(
        new Proton.Span(10, 30),
        new Proton.Span(0.1, 0.3)
      );
      emitter.addInitialize(new Proton.Mass(100));
      emitter.addInitialize(new Proton.Radius(3, 12));
      emitter.addInitialize(new Proton.Life(1.5, 3));
      emitter.addInitialize(
        new Proton.Velocity(
          new Proton.Span(canvas.width / 300, canvas.width / 900),
          new Proton.Span(-300, 300),
          "polar"
        )
      );
      emitter.addBehaviour(new Proton.RandomDrift(30, 30, 0.05));
      emitter.addBehaviour(
        new Proton.Color("ff0000", "random", Infinity, Proton.easeOutQuart)
      );
      emitter.addBehaviour(new Proton.Scale(1, 0.7));
      emitter.p.x = canvas.width / 2;
      emitter.p.y = canvas.height / 2;
      emitter.emit();

      proton.addEmitter(emitter);
      renderer = new Proton.CanvasRenderer(canvas);
      renderer.onProtonUpdate = () => {
        context.fillStyle = "rgba(53, 53, 53, 0.1)";
        context.fillRect(0, 0, canvas.width, canvas.height);
      };
      proton.addRenderer(renderer);
    }

    function render() {
      RAFManager.add(() => {
        stats.begin();
        emitter.rotation += 10;
        proton.update();
        stats.end();
      });
    }

  }

  // meta - when window changed
  change_proton = () => {
    canvas.width = window.innerWidth;
    canvas.height = canvas.width * 3;
    emitter.p.x = canvas.width / 2;
    emitter.p.y = canvas.height / 2;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.change_proton);
  }

  render() {
    return (
      <canvas id="canvas" ref='proton'></canvas>
    );
  }
}

var RAFManager = {
  timer: 0,
  state: 'stop',
  animations: [],

  add: function add(callback) {
    var fps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60;
    var param = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var n = 60 / fps;
    var aniData = { callback: callback, fps: fps, n: n, param: param, i: 0 };
    this.animations.push(aniData);
    if (this.animations.length >= 1) this.start();

    return this;
  },
  getIndex: function getIndex(callback) {
    for (var i = 0; i < this.animations.length; i++) {
      var aniData = this.animations[i];
      if (aniData.callback === callback) return i;
    }

    return -1;
  },
  remove: function remove(callback) {
    var index = this.getIndex(callback);
    if (index < 0) return;

    this.deleteMap(callback);
    if (this.animations.length === 0) this.stop();

    return this;
  },
  deleteMap: function deleteMap(callback) {
    var index = this.getIndex(callback);
    var aniData = this.animations[index];
    for (var key in aniData) {
      delete aniData[key];
    } this.animations.splice(index, 1);
  },
  start: function start() {
    if (this.state === 'start') return;

    this.state = 'start';
    this.tick();
    return this;
  },
  stop: function stop() {
    if (this.state === 'stop') return;

    this.state = 'stop';
    cancelAnimationFrame(this.timer);
    return this;
  },
  tick: function tick() {
    var _this = this;

    this.timer = requestAnimationFrame(function () {
      _this.tick();
    });

    for (var i = 0; i < this.animations.length; i++) {
      var aniData = this.animations[i];
      var callback = aniData.callback;
      var param = aniData.param;

      aniData.i++;
      if (aniData.i >= aniData.n) {
        callback(param);
        aniData.i = 0;
      }
    }
  }
};