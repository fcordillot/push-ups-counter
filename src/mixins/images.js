// Store
import { GETTERS as G } from '@/store/helpers'

export default {
  computed: {
    allImages () {
      return this.$store.getters[G.images]
    }
  }
}
