<template>
  <div class="app"
       :class="elClasses"
       ontouchmove="_handleTouchmove">
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

        this._updateBodyClass()
      },

      // BODY
      _updateBodyClass () {
        const $body = document.body

        if ($body) {
          $body.classList.remove(`color-scheme--light`)
          $body.classList.remove(`color-scheme--dark`)
          $body.classList.add(`color-scheme--${this.$store.getters[G.colorScheme]}`)

          if (this.support.classes.length > 0) {
            this.support.classes.map(c => $body.classList.add(c))
          }
        }
      },

      // Child's Events
      loaderHidden () {
        this.loading = false
      },

      // RAF
      scrollRafCallback (event) {

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

      // HTML Events
      _handleTouchmove (event) {
        if (!this.$route.meta.hasScroll) event.preventDefault()
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

    background-color: white;

    transition: background-color 0.55s $ease-out-quint;
    will-change: background-color;

    &.color-scheme--dark {
      background-color: map-get($colors-list, "black-near");
    }

    &.is-counting {
      // background-image: linear-gradient(167deg, rgb(243, 181, 34) 0%, rgb(249, 193, 48) 66%, rgb(221, 150, 10) 100%);
      background-color: #f3b522;
    }
  }

  * {
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -webkit-overflow-scrolling: auto;
  }

  *::-webkit-scrollbar {
    width: 0px;
  }
</style>

<style lang="scss" scoped>
  .app {
    width: 100vw;
  }
</style>
