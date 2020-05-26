<template>
  <div class="app"
       :class="elClasses">
    <router-view ref="page" />
  </div>
</template>

<script>
  // Store
  import { GETTERS as G, MUTATIONS as M, STATE as S } from '@/store/helpers'

  // Behavior
  import ScrollRAF from '@/behavior/scrollRAF'

  // Helpers
  import { isAutoplaySupportedOldBrowser } from '@/helpers/videos'
  import { throttle } from '@/helpers/globals'
  import { EventBus } from '@/helpers/event-bus'
  import { scrollTo } from '@/helpers/scroll'

  export default {
    data () {
      return {
        env: process.env.VUE_APP_ENV,
        error: null,
        loading: false
      }
    },

    computed: {
      elClasses () {
        return [
          this.loading ? 'is-loading' : '',
          `is-${this.$route.name}`
        ]
      },

      windowH () {
        return this.$store.state[S.windowH]
      },

      isMobileDevice () {
        return this.$store.getters[G.isMobileDevice]
      },

      support () {
        return this.$store.getters[G.support]
      }
    },

    watch: {
      $route: '_onRouteChange'
    },

    beforeCreate () {
      isAutoplaySupportedOldBrowser().then(() => {
        this.$store.commit(M.autoplayVideo, true)
      }).catch(() => {
        this.$store.commit(M.autoplayVideo, false)
      })
    },

    created () {
      this._updateBodyClass()
    },

    async mounted () {
      this.$store.commit(M.mediaQuery)
      window.addEventListener('resize', this.onResize)

      await this.$nextTick()

      this.onResize()
    },

    beforeDestroy () {
      window.removeEventListener('resize', this.onResize)
      document.removeEventListener('app:back-to-top', this.handleBackToTop, false)
    },

    methods: {
      // Watch
      _onRouteChange () {
        scrollTo(0)
      },

      // BODY
      _updateBodyClass () {
        const $body = document.body

        if ($body && this.support.classes.length > 0) {
          this.support.classes.map(c => $body.classList.add(c))

          $body.classList.add(`color-scheme--${this.$store.getters[G.colorScheme]}`)
        }
      },

      // Child's Events
      loaderHidden () {
        this.loading = false
      },

      // RAF
      scrollRafCallback (event) {
        this.toggleVisibilityTracker(event.scrollY)
      },

      toggleVisibilityTracker (scroll) {
        this.menuIsShown = scroll >= this.showMenuOffset
      },

      startRaf () {
        if (this.scrollRafID) return
        this.$nextTick(() => {
          this.scrollRafID = ScrollRAF.add(this.scrollRafCallback)
        })
      },

      stopRaf () {
        if (this.scrollRafID) this.scrollRafID = ScrollRAF.remove(this.scrollRafID)
      },

      // Events
      onResize: throttle(function () {
        this.$store.commit(M.mediaQuery)
        this.$store.commit(M.windowW)
        this.$store.commit(M.windowH)

        EventBus.$emit('resize')
      }, 200)
    }
  }
</script>

<style lang="scss">
  @import "scss/app";

  html,
  body {
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    touch-action: manipulation;
  }

  #main + footer {
    background-color: #FFF;
  }

  .app {
    &.is-home {
      background-color: map-get($colors-list, "black-near");
    }
  }
</style>

<style lang="scss" scoped>
  .app {
    width: 100vw;
  }
</style>
