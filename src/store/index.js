import Vue from 'vue'
import Vuex from 'vuex'

import getCurrentMediaQuery from '@area17/a17-helpers/src/utility/getCurrentMediaQuery'

// Helpers
import { isTouchDevice, tabletBreakpoints, mobileBreakpoints } from '@/helpers/globals'
import { getColorScheme } from '@/helpers/dark-mode'
import { getLang } from '@/helpers/lang'
import Support from '@/helpers/support'
import Cookie from '@/helpers/cookie'

// Constants
import { Names as CookieNames } from '@/constants/Cookie'

// Store
import { STATE, MUTATIONS, GETTERS } from '@/store/helpers'

// Data
import imagesData from '@/data/images'
import globalData from '@/data/global'

Vue.use(Vuex)

export const state = {
  [STATE.support]: new Support(),
  [STATE.lang]: getLang(),
  [STATE.mediaQuery]: getCurrentMediaQuery(),
  [STATE.isTouchDevice]: isTouchDevice(),
  [STATE.isRetina]: window.devicePixelRatio > 1,
  [STATE.direction]: 'ltr',
  [STATE.pageHeight]: 0,
  [STATE.canAutoPlayVideo]: false,
  [STATE.lang]: 'en',
  [STATE.windowW]: window.inenrWidth,
  [STATE.windowH]: window.innerHeight,
  [STATE.enableLazyLoad]: true,
  [STATE.documentHeight]: 0,
  [STATE.gtmEventsSent]: [],
  [STATE.colorScheme]: getColorScheme(),
  [STATE.images]: imagesData(),
  [STATE.globalData]: globalData(),
  //
  [STATE.historic]: JSON.parse(Cookie.get(CookieNames.HISTORIC)) || [],
  [STATE.count]: 0
}

export const getters = {
  [GETTERS.support]: state => state.support,
  [GETTERS.lang]: state => state.lang,
  [GETTERS.isTabletDevice]: state => tabletBreakpoints.includes(state[STATE.mediaQuery]),
  [GETTERS.isMobileDevice]: state => mobileBreakpoints.includes(state[STATE.mediaQuery]),
  [GETTERS.isGtmEventSent]: state => eventUid => state[STATE.gtmEventsSent].includes(eventUid),
  [GETTERS.colorScheme]: state => state.colorScheme,
  [GETTERS.images]: state => state.images,
  [GETTERS.globalData]: state => state.globalData,
  //
  [GETTERS.historic]: state => state[STATE.historic],
  [GETTERS.count]: state => state[STATE.count]
}

export const mutations = {
  [MUTATIONS.support] (state, support) {
    state[STATE.support] = support
  },
  [MUTATIONS.lang] (state, lang) {
    state[STATE.lang] = lang
  },
  [MUTATIONS.mediaQuery] (state) {
    state[STATE.mediaQuery] = getCurrentMediaQuery()
  },
  [MUTATIONS.pageHeight] (state, pageHeight) {
    state[STATE.pageHeight] = pageHeight
  },
  [MUTATIONS.documentHeight] (state, documentHeight) {
    state[STATE.documentHeight] = documentHeight
  },
  [MUTATIONS.direction] (state, direction) {
    state[STATE.direction] = direction
  },
  [MUTATIONS.autoplayVideo] (state, autoplay) {
    state[STATE.canAutoPlayVideo] = autoplay
  },
  [MUTATIONS.lang] (state, lang) {
    state[STATE.lang] = lang
  },
  [MUTATIONS.windowW] (state) {
    state[STATE.windowW] = window.innerWidth
  },
  [MUTATIONS.windowH] (state) {
    state[STATE.windowH] = window.innerHeight
  },
  [MUTATIONS.enableLazyLoad] (state) {
    state[STATE.enableLazyLoad] = true
  },
  [MUTATIONS.sendGtmEvent] (state, eventUid) {
    state[STATE.gtmEventsSent].push(eventUid)
  },
  [MUTATIONS.colorScheme] (state, colorScheme) {
    state[STATE.colorScheme] = colorScheme
  },
  [MUTATIONS.images] (state, images) {
    state[STATE.images] = images
  },
  [MUTATIONS.globalData] (state, globalData) {
    state[STATE.globalData] = globalData
  },
  //
  [MUTATIONS.clearHistory] (state) {
    Cookie.set(CookieNames.HISTORIC, JSON.stringify([]))
    state[STATE.historic] = []
  },
  [MUTATIONS.removeValueToHistoric] (state, uid) {
    const historic = state[STATE.historic]
    const index = historic.findIndex(h => h.uid === uid)

    historic.splice(index, 1)

    Cookie.set(CookieNames.HISTORIC, JSON.stringify(historic))
    state[STATE.historic] = historic
  },
  [MUTATIONS.addValueToHistoric] (state, value) {
    const historic = state[STATE.historic]

    historic.push(value)

    Cookie.set(CookieNames.HISTORIC, JSON.stringify(historic))
    state[STATE.historic] = historic
  },
  [MUTATIONS.addNewCount] (state, value) {
    state[STATE.count] = value
  }
}

export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations
})
