// constants
import scrollRAF from '@/constants/scrollRAF'

/**
 * ScrollRAF
 * Optimize animations on scroll
 * Simple Singleton to listen scroll and update things on raf
 */
class ScrollRAF {
  constructor () {
    if (!ScrollRAF.instance) {
      this._isRunning = false
      this._callbacksMap = {}
      this._callbacks = []
      this.lastKnownScrollY = 0
      this.currentScrollY = 0
      this.event = null
      this._ticking = false

      ScrollRAF.instance = this
    }

    return ScrollRAF.instance
  }

  onScroll (event) {
    this.event = event
    this.currentScrollY = window.pageYOffset
    this.requestTick()
  }

  requestTick () {
    if (!this._ticking) {
      window.requestAnimationFrame(this.update.bind(this))
    }
    this._ticking = true
  }

  update () {
    this._callbacks.forEach(callback => {
      const _ = {
        scrollY: this.currentScrollY,
        lastScrollY: this.lastKnownScrollY,
        event: this.event,
        scrollDirection: this.lastKnownScrollY < this.currentScrollY ? scrollRAF.toBottom : this.lastKnownScrollY > this.currentScrollY ? scrollRAF.toTop : scrollRAF.stable
      }

      callback(_)
    })

    this.lastKnownScrollY = this.currentScrollY
    this._ticking = false
  }

  run () {
    this._isRunning = true
    window.addEventListener('scroll', this.onScroll.bind(this), false)
    window.addEventListener('mousewheel', this.onScroll.bind(this), false)
  }

  stop () {
    this._isRunning = false
    window.removeEventListener('scroll', this.onScroll.bind(this), false)
    window.removeEventListener('mousewheel', this.onScroll.bind(this), false)
  }

  /**
   * Add Method
   * @param callback, an object with top and down method
   * @returns Number, a timestamp corresponding to id of callback
   */
  add (callback) {
    if (typeof callback !== 'function') return false
    const index = Date.now() + Math.floor(Math.random() * 90000) + 10000
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

const instance = new ScrollRAF()

export default instance
