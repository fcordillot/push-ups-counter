<template>
  <div class="phome"
       :class="elClasses">
    <div class="phome__container"
         @click="_handleClick">
      <div class="phome__counter f-count-1 f-color-white"
          ref="counter"
          v-html="count">
      </div>

      <div class="u-marg-t-2">
        <puc-stopwatch ref="stopwatch"></puc-stopwatch>
      </div>
    </div>

    <div class="phome__reset-and-save f-reset f-color-white u-align-center"
         v-html="'Reset and save'"
         @click="_resetAndSave">
    </div>

    <div class="phome__history f-color-white">
      <router-link :to="{ name: 'history' }">
        <puc-svg-icon icon="history"></puc-svg-icon>
      </router-link>
    </div>

    <div class="phome__mute f-color-white"
         @click="mute">
      <puc-svg-icon :icon="muted ? 'sound' : 'mute'"></puc-svg-icon>
    </div>

    <audio
        class="phome__beep"
        ref="beep"
        src="~@/assets/sounds/beep.wav">
            Your browser does not support the
            <code>audio</code> element.
    </audio>
  </div>
</template>

<script>
  // Dependencies
  import NoSleep from 'nosleep.js'

  // Mixins
  import PageMixin from '@/mixins/page'

  // Store
  import { GETTERS as G, MUTATIONS as M } from '@/store/helpers'

  // Helpers
  import { EventBus } from '@/helpers/event-bus'
  import { localISOString } from '@/helpers/date'
  import { randomUUID } from '@/helpers/random'
  import { disableScroll } from '@/helpers/scroll'

  // Components
  import PUCStopwatch from '@/components/stopwatch/PUCStopwatch'

  export default {
    name: 'PHome',
    pageName: 'home',
    mixins: [PageMixin],

    components: {
      'puc-stopwatch': PUCStopwatch
    },

    data () {
      return {
        noSleepEnabled: false,
        counting: false
      }
    },

    computed: {
      stopwatchStartedAt () {
        return this.$store.getters[G.stopwatchStartedAt]
      },

      count () {
        return this.$store.getters[G.count]
      },

      muted () {
        return this.$store.getters[G.muted]
      },

      historic () {
        return this.$store.getters[G.historic]
      },

      elClasses () {
        return [
          this.counting ? 'is-counting' : ''
        ]
      }
    },

    created () {
      this.NoSleep = new NoSleep()

      // Events
      EventBus.$on('resize', this._onResize)
    },

    async mounted () {
      await this.$nextTick()

      if (this.stopwatchStartedAt !== null) {
        this._resumeStopwatch()
      }

      disableScroll()
      this._onResize()
    },

    detroyed () {
      // Events
      EventBus.$off('resize', this._onResize)
    },

    methods: {
      // Events
      _onResize () {
        let vh = window.innerHeight * 0.01
        // Then we set the value in the --vh custom property to the root of the document
        this.$el.style.setProperty('--vh', `${vh}px`)
      },

      // HTML Events
      async _handleClick () {
        if (!this.noSleepEnabled) {
          this.NoSleep.enable()
          this.noSleepEnabled = true
        }

        if (this.counting) return

        if (this.count === 0) {
          this._startStopwatch()
        }
        this.$store.commit(M.addNewCount, this.count + 1)
        this._playSound()
        this.counting = true
        setTimeout(() => {
          this.counting = false
        }, 250)

        await this.$nextTick()

        this._updateFontSize()
      },

      _playSound () {
        const $beep = this.$refs['beep']

        if ($beep && !this.muted) {
          $beep.currentTime = 0
          $beep.play()
        }
      },

      _startStopwatch () {
        const $stopwatch = this.$refs['stopwatch']

        if ($stopwatch) {
          $stopwatch.start()
        }
      },

      _resumeStopwatch () {
        const $stopwatch = this.$refs['stopwatch']

        if ($stopwatch) {
          $stopwatch.resume()
        }
      },

      _stopStopwatch () {
        const $stopwatch = this.$refs['stopwatch']

        if ($stopwatch) {
          $stopwatch.stop()
          $stopwatch.reset()
        }
      },

      _updateFontSize () {
        const $counter = this.$refs['counter']

        if ($counter) {
          const nbOfNumbers = $counter.innerText.length
          const _class = `f-count-${nbOfNumbers}`

          if (!$counter.className.includes(_class)) {
            for (let i = 1; i < 10; i += 1) {
              $counter.classList.remove(`f-count-${i}`)
            }

            $counter.classList.add(_class)
          }
        }
      },

      // HTML Actions
      async _resetAndSave () {
        if (this.count > 0) {
          this.$store.commit(M.addValueToHistoric, {
            value: this.count,
            created_at: localISOString(),
            uid: randomUUID(),
            duration: this.$refs['stopwatch'] ? this.$refs['stopwatch'].getDuration() : 0
          })
        }

        this.$store.commit(M.addNewCount, 0)
        this._stopStopwatch()

        await this.$nextTick()

        this._updateFontSize()
        this.reseting = false
      },

      mute () {
        this.$store.commit(M.muted, !this.muted)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .phome {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateZ(0);

    width: 100%;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);

    // background-color: map-get($colors-list, "black-near");
    background-image: none;

    transition: background-color 0.55s $ease-out-quint, background-image 0.55s $ease-out-quint;
    will-change: background-color, background-image;

    &.is-counting {
      background-image: linear-gradient(167deg, rgb(243, 181, 34) 0%, rgb(249, 193, 48) 66%, rgb(221, 150, 10) 100%);
    }
  }

  .phome__container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .phome__counter {
    position: relative;
    transform: translateZ(0);

    transition: transform 0.55s $ease-out-quint;
    will-change: transform;

    .phome.is-counting & {
      transform: scale(1.1) translateZ(0);
    }
  }

  .phome__reset-and-save {
    position: absolute;
    right: 0;
    bottom: $base-px * 2;
    left: 0;
    z-index: 2;

    opacity: 0.5;
  }

  .phome__history {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;

    width: $base-px * 7;
    height: $base-px * 7;
    padding: $base-px * 2;

    opacity: 0.5;
  }

  .phome__mute {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;

    width: $base-px * 7;
    height: $base-px * 7;
    padding: $base-px * 2;

    opacity: 0.5;
  }

  .phome__beep {
    display: none;
  }
</style>
