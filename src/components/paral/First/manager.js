let RAFManager = {
  timer: 0,
  state: 'stop',
  animations: [],

  add: function add(callback) {
    let fps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60
    let param = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null

    let n = 60 / fps
    let aniData = { callback: callback, fps: fps, n: n, param: param, i: 0 }
    this.animations.push(aniData)
    if (this.animations.length >= 1) this.start()

    return this
  },
  getIndex: function getIndex(callback) {
    for(let i in this.animations){
      if (this.animations[i].callback === callback) return i
    }

    return -1
  },
  remove: function remove(callback) {
    let index = this.getIndex(callback)
    if (index < 0) return

    this.deleteMap(callback)
    if (this.animations.length === 0) this.stop()

    return this
  },
  deleteMap: function deleteMap(callback) {
    let index = this.getIndex(callback)
    let aniData = this.animations[index]
    for (let key in aniData) {
      delete aniData[key]
    } this.animations.splice(index, 1)
  },
  start: function start() {
    if (this.state === 'start') return

    this.state = 'start'
    this.tick()
    return this
  },
  stop: function stop() {
    if (this.state === 'stop') return

    this.state = 'stop'
    cancelAnimationFrame(this.timer)
    return this
  },
  tick: function tick() {
    let _this = this

    this.timer = requestAnimationFrame(function () {
      _this.tick()
    })
    
    for(let i in this.animations){
      let aniData = this.animations[i]
      let callback = aniData.callback
      let param = aniData.param

      aniData.i++
      if (aniData.i >= aniData.n) {
        callback(param)
        aniData.i = 0
      }
    }
  }
}

export {RAFManager}