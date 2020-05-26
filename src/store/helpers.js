export const STATE = {
  pageHeight: 'pageHeight',
  lang: 'lang',
  support: 'support',
  isTouchDevice: 'isTouchDevice',
  isInteracting: 'isInteracting',
  direction: 'direction',
  isRetina: 'isRetina',
  canAutoPlayVideo: 'canAutoPlayVideo',
  showLangSwitcher: 'showLangSwitcher',
  windowW: 'windowW',
  windowH: 'windowH',
  mediaQuery: 'mediaQuery',
  enableLazyLoad: 'enableLazyLoad',
  documentHeight: 'documentHeight',
  gtmEventsSent: 'gtmEventsSent',
  colorScheme: 'colorScheme',
  images: 'images',
  globalData: 'globalData',
  //
  historic: 'historic',
  count: 'count',
  muted: 'muted'
}

export const GETTERS = {
  support: 'support',
  lang: 'lang',
  isTabletDevice: 'isTabletDevice',
  isMobileDevice: 'isMobileDevice',
  isGtmEventSent: 'isGtmEventSent',
  colorScheme: 'colorScheme',
  images: 'images',
  globalData: 'globalData',
  //
  historic: 'historic',
  count: 'count',
  muted: 'muted'
}

export const MUTATIONS = {
  support: 'M_support',
  lang: 'M_lang',
  mediaQuery: 'M_MEDIA-QUERY',
  pageHeight: 'M_PAGE-HEIGHT',
  windowH: 'M_WINDOW_H',
  windowW: 'M_WINDOW_W',
  autoplayVideo: 'M_autoplay-video',
  direction: 'M_direction',
  enableLazyLoad: 'M_ennableLazyLoad',
  documentHeight: 'M_documentHeight',
  sendGtmEvent: 'M_sendGtmEvent',
  isInteracting: 'M_isInteracting',
  colorScheme: 'M_colorScheme',
  images: 'M_images',
  globalData: 'M_globalData',
  //
  clearHistory: 'M_clearHistory',
  addValueToHistoric: 'M_addValueToHistoric',
  removeValueToHistoric: 'M_removeValueToHistoric',
  addNewCount: 'M_addNewCount',
  muted: 'M_muted'
}
