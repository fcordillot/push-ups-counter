export default {
  data () {
    return {
      isLoaded: false
    }
  },
  computed: {
    lazyLoadClass () {
      return {
        'pot-lazy-load--load': true,
        'pot-lazy-load--loaded': this.isLoaded
      }
    },
    visibilityOpts () {
      return {
        callback: this.visibilityChanged,
        intersection: {
          root: null,
          rootMargin: '500px',
          threshold: 0
        }
      }
    }
  },
  methods: {
    visibilityChanged (visible, entry) {},
    handleLazyLoad () {
      this.$nextTick(() => {
        this.isLoaded = true
      })
    }
  }
}
