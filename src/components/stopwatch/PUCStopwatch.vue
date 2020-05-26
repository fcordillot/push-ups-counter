<template>
  <section class="puc-stopwatch f-color-black-near f-stopwatch"
           :class="elClasses"
           :style="elStyle"
           v-html="html">
  </section>
</template>

<script>
  // Behaviors
  import RAF from '@/behavior/RAF'

  // Store
  import { GETTERS as G, MUTATIONS as M } from '@/store/helpers'

  export default {
    name: 'PUCStopwatch',

    data () {
      return {
        html: '00:00:00'
      }
    },

    computed: {
      startedAt () {
        return this.$store.getters[G.stopwatchStartedAt]
      },

      elClasses () {
        return []
      },

      elStyle () {
        return {}
      }
    },

    async mounted () {
      await this.$nextTick()
    },

    beforeDestroy () {
      this.stopRAF()
    },

    methods: {
      // Actions
      start () {
        this.$store.commit(M.stopwatchStartedAt, new Date())
        this.startRAF()
      },

      resume () {
        this.startRAF()
      },

      stop () {
        this.stopRAF()
      },

      reset () {
        this.$store.commit(M.stopwatchStartedAt, null)
        this.html = '00:00:00'
      },

      getDuration () {
        const now = new Date()

        return now - this.startedAt
      },

      // RAF
      async startRAF () {
        if (this.rafID) return
        await this.$nextTick()

        this.rafID = RAF.add(this.rafCallback)
      },

      stopRAF () {
        if (this.rafID) this.rafID = RAF.remove(this.rafID)
      },

      rafCallback (event) {
        const now = new Date()
        let diffInMs = now - this.startedAt
        const ms = String(((now - this.startedAt) % 1000)).padStart(2, '0').substr(0, 2)

        // Take out milliseconds
        diffInMs = diffInMs / 1000
        const seconds = Math.floor(diffInMs % 60)
        diffInMs = diffInMs / 60
        const minutes = Math.floor(diffInMs % 60)
        diffInMs = diffInMs / 60
        const hours = Math.floor(diffInMs % 24)

        if (hours > 0) {
          this.html = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        } else {
          this.html = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(ms)}`
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .puc-stopwatch {
    font-family: monospace;

    .color-scheme--dark & {
      color: white;
    }
  }
</style>
