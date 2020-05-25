import Vue from 'vue'
import Router from 'vue-router'
import VueHead from 'vue-head'

// Pages
import PHome from '@/views/PHome'
import PHistory from '@/views/PHistory'

Vue.use(Router)
Vue.use(VueHead, {
  separator: '•',
  complement: process.env.VUE_APP_SITE_NAME
})

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: PHome
    },
    {
      path: '/history',
      name: 'history',
      component: PHistory
    }
  ],
  /**
   * Router Scroll behavior
   * @see: https://router.vuejs.org/guide/advanced/scroll-behavior.html#scroll-behavior
   */
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
