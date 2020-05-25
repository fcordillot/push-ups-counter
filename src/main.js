import 'es6-promise/auto'
import Vue from 'vue'

import App from './App.vue'
import router from './router/router'
import store from './store'

// Components
import PUCLazyLoad from '@/components/media/PUCImageLazyLoad'
import PUCMedia from '@/components/media/PUCMedia'
import PUCImage from '@/components/media/PUCImage'
import PUCIcon from '@/components/svg/PUCSvgSIcon'
import PUCText from '@/components/text/PUCText'

import { ObserveVisibility } from 'vue-observe-visibility'

require('intersection-observer')
require('@/polyfills/customEvent')

Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV !== 'production'
Vue.config.performance = process.env.NODE_ENV !== 'production'

Vue.directive('observe-visibility', ObserveVisibility)

Vue.component('puc-image-lazy-load', PUCLazyLoad)
Vue.component('puc-media', PUCMedia)
Vue.component('puc-image', PUCImage)
Vue.component('puc-svg-icon', PUCIcon)
Vue.component('puc-text', PUCText)

// Hack to fix ie11 bcg bug
if (navigator.userAgent.match(/Trident\/7\./)) {
  const fixScroll = (event) => {
    event.preventDefault()
    var wd = event.wheelDelta
    var csp = window.pageYOffset
    window.scrollTo(0, csp - wd)
  }

  document.addEventListener('app:in-menu', () => {
    document.body.removeEventListener('mousewheel', fixScroll)
  })

  document.addEventListener('app:out-menu', () => {
    document.body.addEventListener('mousewheel', fixScroll)
  })

  document.body.addEventListener('mousewheel', fixScroll)
}

const app = new Vue({
  router,
  store,
  render: h => h(App)
})

document.addEventListener('DOMContentLoaded', function () {
  app.$mount('#app')
  document.dispatchEvent(new CustomEvent('app:pre-rendering'))
})
