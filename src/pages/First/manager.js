export var RAFManager = {
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