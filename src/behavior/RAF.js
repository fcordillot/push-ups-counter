/**
 * RAF
 * Optimize animations on scroll
 * Simple Singleton to listen scroll and update things on raf
 */
class RAF {
  constructor () {
    if (!RAF.instance) {
      this._isRunning = false
      this._callbacksMap = {}
      this._callbacks = []

      RAF.instance = this
    }

    return RAF.instance
  }

  update () {
    this._callbacks.forEach(callback => {
      callback()
    })

    window.requestAnimationFrame(this.update.bind(this))
  }

  run () {
    this._isRunning = true
    window.requestAnimationFrame(this.update.bind(this))
  }

  stop () {
    this._isRunning = false
  }

  /**
   * Add Method
   * @param callback, an object with top and down method
   * @returns Number, a timestamp corresponding to id of callback
   */
  add (callback) {
    if (typeof callback !== 'function') return false
    const index = Date.now()
    this._callbacksMap[index] = callback
    this._callbacks = Object.values(this._callbacksMap)

    if (this._isRunning) return index

    this.run()
    return index
  }

  /**
   * Remove Method
   * Pass an id of callback as param
   * @param id
   * @returns {null}
   */
  remove (id) {
    if (!this._callbacksMap[id]) return
    delete this._callbacksMap[id]
    this._callbacks = Object.values(this._callbacksMap)
    if (this._callbacks.length === 0) {
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
