export const disableScroll = () => {
  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflowY = 'hidden'
}

export const enableScroll = () => {
  document.body.style.overflowY = 'visible'
  document.body.style.overflow = 'visible'
  document.documentElement.style.overflow = 'visible'
  document.documentElement.style.overflowX = 'hidden'
  document.documentElement.style.overflowY = 'auto'
}

const preventDefault = (e) => {
  e = e || window.event
  if (e.preventDefault) {
    e.preventDefault()
  }
  e.returnValue = false
}

export const scrollTo = (value = 0, smooth = false) => {
  if (!smooth) {
    window.scrollTo(0, value)
  } else {
    window.scroll({
      top: value,
      behavior: 'smooth'
    })
  }
}

const preventDefaultForScrollKeys = (e) => {
  const keys = {
    37: 1,
    38: 1,
    39: 1,
    40: 1
  }
  if (keys[e.keyCode]) {
    preventDefault(e)
    return false
  }
}

export const disableScrollHard = () => {
  document.body.style.overflowY = 'hidden'
  document.documentElement.style.overflowY = 'hidden'
  window.onwheel = preventDefault
  window.onmousewheel = document.onmousewheel = preventDefault
  window.ontouchmove = preventDefault
  document.onkeydown = preventDefaultForScrollKeys
}

export const enableScrollHard = () => {
  document.body.style.overflowY = 'auto'
  document.documentElement.style.overflowY = 'auto'
  window.onmousewheel = document.onmousewheel = null
  window.onwheel = null
  window.ontouchmove = null
  document.onkeydown = null
}
