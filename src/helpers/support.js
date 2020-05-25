const USER_AGENT = navigator.userAgent.toLowerCase()

// https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
export default class Support {
  constructor () {
    this.touch = ('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0)
    this.android = USER_AGENT.indexOf('android') > -1
    this.ios = /iPad|iPhone|iPod|ipad|iphone|ipod/.test(USER_AGENT) && !window.MSStream
    this.ie = document.documentMode || /Edge/.test(USER_AGENT)

    // Get the device
    this.mac = navigator.platform.indexOf('Mac') > -1
    this.windows = navigator.platform.indexOf('Win') > -1
    this.iphone = /iPhone|iphone/.test(USER_AGENT)
    this.ipad = /iPad|ipad/.test(USER_AGENT)
    this.ipod = /iPod|ipod/.test(USER_AGENT)

    // Get the navigator
    this.defaultNavigator = (USER_AGENT.indexOf('turbobrowser') > -1)
    this.opera = (USER_AGENT.indexOf('opr') > -1) && !this.defaultNavigator
    // eslint-disable-next-line no-mixed-operators
    this.edge = (USER_AGENT.indexOf('edgios') > -1) || (USER_AGENT.indexOf('edge    ') > -1) && !this.defaultNavigator
    this.chrome = (USER_AGENT.indexOf('crios') > -1 || USER_AGENT.indexOf('chrome') > -1) && !this.defaultNavigator && !this.edge
    this.firefox = (USER_AGENT.indexOf('fxios') > -1 || USER_AGENT.indexOf('firefox') > -1) && !this.defaultNavigator
    this.safari = (USER_AGENT.indexOf('safari') > -1) && !this.opera && !this.chrome && !this.firefox && !this.edge && !this.defaultNavigator

    this.classes = this._getClasses()
  }

  _getClasses () {
    return Object.keys(this).map(key => {
      if (key === 'ie' && this[key]) {
        return `is-${key} is-${key}-${this[key]}`
      } else if (this[key]) {
        return `is-${key.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)}`
      }

      return false
    }).filter(c => c !== false)
  }
}
