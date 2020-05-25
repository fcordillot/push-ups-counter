/**
 * Detect current runtime environment
 * @type {boolean}
 */
export const isProd = process.env.NODE_ENV === 'production'

/**
 * Detect if browser support touch events
 * @returns {boolean}
 */
export const isTouchDevice = () => (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))

export const tabletBreakpoints = ['xsmall', 'small', 'medium']
export const mobileBreakpoints = ['xsmall', 'small']

export const getCurrentMediaQuery = () => {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/getCurrentMediaQuery

  const parse = str => str.replace(/'/gi, '').replace(/"/gi, '')

  if (window.opera) {
    return parse(window.getComputedStyle(document.body, ':after').getPropertyValue('content')) || 'large'
  } else if (window.getComputedStyle) {
    return parse(window.getComputedStyle(document.head, null).getPropertyValue('font-family')) || 'large'
  } else {
    return 'large'
  }
}

export const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// export const debounce = (fn, ms = 0) => {
//   let timeoutId
//   return function (...args) {
//     clearTimeout(timeoutId)
//     timeoutId = setTimeout(() => {
//       fn.apply(this, args)
//     }, ms)
//   }
// }

export const debounce = (callback, wait, immediate = false) => {
  let timeout = null

  return function () {
    const callNow = immediate && !timeout
    const next = () => callback.apply(this, arguments)

    clearTimeout(timeout)
    timeout = setTimeout(next, wait)

    if (callNow) {
      next()
    }
  }
}

export const breakpointFromWidth = (width) => {
  const breakpoints = {
    xsmall: {
      start: null,
      end: 449
    },
    small: {
      start: 450,
      end: 749
    },
    medium: {
      start: 750,
      end: 969
    },
    large: {
      start: 970,
      end: 1279
    },
    xlarge: {
      start: 1280,
      end: null
    }
  }
  let breakpoint = null

  const breakpointsKeys = Object.keys(breakpoints)
  if (breakpointsKeys && breakpointsKeys.length > 0) {
    for (let i = 0; i < breakpointsKeys.length; i += 1) {
      const b = breakpoints[breakpointsKeys[i]]

      if ((b.start === null && width <= b.end) ||
        (width > b.start && width <= b.end) ||
      (b.end === null && width > b.start)) {
        breakpoint = breakpointsKeys[i]
      }
    }
  }

  return breakpoint
}

/**
 * Return current browserSpecs infos (name and version)
 * @type {{name, version}}
 */
export const browserSpecs = (() => {
  const ua = navigator.userAgent
  let tem = null
  let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || []
    return {
      name: 'IE', version: (tem[1] || '')
    }
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/)
    if (tem != null) {
      return {
        name: tem[1].replace('OPR', 'Opera'),
        version: tem[2]
      }
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?']
  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1])
  }
  return {
    name: M[0],
    version: M[1]
  }
})()

// export const throttle = (fn, wait) => {
//   let inThrottle, lastFn, lastTime
//   return function () {
//     const context = this
//     const args = arguments
//     if (!inThrottle) {
//       fn.apply(context, args)
//       lastTime = Date.now()
//       inThrottle = true
//     } else {
//       clearTimeout(lastFn)
//       lastFn = setTimeout(function () {
//         if (Date.now() - lastTime >= wait) {
//           fn.apply(context, args)
//           lastTime = Date.now()
//         }
//       }, wait - (Date.now() - lastTime))
//     }
//   }
// }

export const throttle = (func, limit) => {
  let inThrottle
  return function () {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      // eslint-disable-next-line
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Get current document height
 * @returns {number}
 */
export const getDocumentHeight = () => {
  const body = document.body
  const html = document.documentElement

  return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
}

/**
 * Load an image from give url
 * Loaded image is passed inside promise returned
 * @param url
 * @returns {Promise<any>}
 */
export const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image()

    const done = () => {
      image.onload = null
      image.onerror = null
      resolve(image)
    }

    const error = () => {
      image.onload = null
      image.onerror = null
      reject(new Error(`Utils can't load image ${url}`))
    }

    image.onload = done
    image.onerror = error

    image.src = url
  })
}

/**
 * Detect if Vue app is running with prerender plugin
 * Useful to prevent behavior as lazy-loading when site is running in headless Chrome
 * @type {*|boolean}
 */
export const isPrerendering = window.__PRERENDER_INJECTED && window.__PRERENDER_INJECTED.prerendered

/**
 * Translate an element with translate 3D css property
 * Used for better performances because translate3d runs on GPU instead of CPU
 * @param el
 * @param x
 * @param y
 * @param z
 */
export const translate3DElement = (el, x = 0, y = 0, z = 0) => {
  el.style.transform = `translate3d(${x}, ${y}, ${z})`
  el.style.webkitTransform = `translate3d(${x}, ${y}, ${z})`
}

/**
 * Update current scroll position of body
 * @param pos
 */
export const setScrollPosition = (pos) => {
  document.documentElement.scrollTop = pos
  document.body.scrollTop = pos
}
