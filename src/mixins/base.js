// Mixins
import GTMMixin from '@/mixins/gtm'

// Store
import { GETTERS as G } from '@/store/helpers'

export default {
  mixins: [GTMMixin],

  computed: {

  },

  created () {
    // console.log(`${this.$options.name}:created`)
  },

  mounted () {
    // console.log(`${this.$options.name}:mounted`)
  },

  destroyed () {
    // console.log(`${this.$options.name}:destroyed`)
  }
}
