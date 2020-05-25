/**
 * Default v-observe-visibility configuration
 *
 */

import { STATE as S } from '@/store/helpers'
import { isPrerendering } from '@/helpers/globals'

export default {
  data () {
    return {
      vRoot: null,
      vRootMargin: '150px 0px 150px 0px',
      vThresold: 0.1,
      vOnce: true
    }
  },

  computed: {
    canLoad () {
      return this.$store.state[S.enableLazyLoad]
    },

    visibilityOpts () {
      return {
        callback: this.visibilityCallback,
        intersection: {
          root: this.vRoot,
          rootMargin: this.vRootMargin,
          threshold: this.vThresold
        },
        once: this.vOnce
      }
    }
  },

  methods: {
    visibilityCallback (visible, entry) {
      if (isPrerendering || !this.canLoad) return

      if (visible) {
        this.isVisibleCallback(visible, entry)
      } else {
        this.isHiddenCallback(visible, entry)
      }
    },

    isVisibleCallback () {},

    isHiddenCallback () {}
  }
}
