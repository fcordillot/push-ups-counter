/**
 * @class RAF
 * @desc Define a only instance of requestAnimationFrame to run all callbacks in one place.
 * Try to keep callbacks array short as possible because we only have 16ms to run callback
 */

class RAF {
  constructor () {
    if (!RAF.instance) {
      this._radId = null
      this._callbacksMap = {}
      this._callbacks = []
      this._autoplay = false
      RAF.instance = this
    }

    return RAF.instance
  }

  autoplay () {
    this._autoplay = true
    this.run()
  }

  run () {
    this._radId = window.requestAnimationFrame(this.draw.bind(this))
  }

  draw (timestamp) {
    this._callbacks.forEach(callback => {
      callback(timestamp)
    })
    if (!this._autoplay) return
    this._radId = window.requestAnimationFrame(this.draw.bind(this))
  }

  tick () {
    this._radId = window.requestAnimationFrame(this.draw.bind(this))
  }

  stop () {
    window.cancelAnimationFrame(this._radId)
    this._radId = null
    this._autoplay = false
  }

  add (callback) {
    if (typeof callback !== 'function') return false
    const index = Date.now()
    this._callbacksMap[index] = callback
    this._callbacks = Object.values(this._callbacksMap)
    return index
  }

  remove (id) {
    if (!this._callbacksMap[id]) return
    delete this._callbacksMap[id]
    this._callbacks = Object.values(this._callbacksMap)
    // console.log('RAF - remove', id, this._callbacks.length)
    if (this._callbacks.length === 0) {
      // console.log('STOP RAF')
      this.stop()
    }
    return null
  }

  destroy () {
    this.stop()
    this._callbacks = []
    this._callbacksMap = {}
  }
}

const instance = new RAF()

export default instance
