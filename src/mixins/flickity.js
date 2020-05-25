/**
 * Default Flickity option used by most sliders components
 */

import { STATE as S } from '@/store/helpers'

export default {
  data () {
    return {
      flickityOpts: {
        accessibility: true,
        wrapAround: true,
        percentPosition: false,
        pageDots: false,
        prevNextButtons: false,
        lazyLoad: false,
        dragThreshold: 5,
        rightToLeft: this.$store.state[S.direction] === 'rtl'
      }
    }
  },
  methods: {
    isFlickityDragging (state) {
      if (state) {
        document.ontouchmove = function (e) {
          e.preventDefault()
        }
      } else {
        document.ontouchmove = function (e) {
          return true
        }
      }
    }
  }
}
