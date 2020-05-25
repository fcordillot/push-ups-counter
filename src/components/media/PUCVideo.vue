<template>
  <video ref="video" class="puc-video" :autoplay="autoplay" playsinline muted preload="auto" :class="videoClasses">
    <source v-if=" 'webm' in video.src " :src="video.src.webm" type="video/webm; codecs=vp9,vorbis">

    <source v-if=" 'mp4' in video.src " :src="video.src.mp4" type="video/mp4">
  </video>
</template>

<script>
  // Helpers
  import { fitAIntoB } from '@/helpers/maths'

  export default {
    name: 'PUCVideo',

    props: {
      video: {
        type: Object,
        required: true
      },
      klass: {
        type: String,
        default: ''
      },
      autoplay: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {

      }
    },

    computed: {
      videoClasses () {
        return {
          [this.klass]: this.klass.length > 0
        }
      }
    },

    created () {
      this.videoOpts = {
        width: 1920,
        height: 1080
      }
    },

    mounted () {
      if (this.video.playbackRate) {
        this.$refs.video.playbackRate = this.video.playbackRate
      }

      this.$refs.video.addEventListener('canplay', () => {
        this.sendEvent('canplay')
      })

      this.$refs.video.addEventListener('ended', () => {
        this.sendEvent('ended')
      })

      this.$refs.video.addEventListener('play', () => {
        this.sendEvent('play')
      })

      this.resize()
    },

    methods: {
      // Getters
      get (key) {
        return this.$refs.video[key]
      },

      // Setters
      set (key, value) {
        this.$refs.video[key] = value
      },

      resize (rect = {}) {
        if (this.video.isFullScreen) {
          const width = rect.width ? rect.width : window.innerWidth
          const height = rect.height ? rect.height : window.innerHeight

          const videoFitted = fitAIntoB(this.videoOpts, {
            width,
            height
          })

          this.$refs.video.style.width = `${Math.ceil(videoFitted.width)}px`
          this.$refs.video.style.height = `${Math.ceil(videoFitted.height)}px`
        }
      },

      // Actions
      pause () {
        this.$refs.video.pause()

        this.sendEvent('pause')
      },

      play () {
        this.$refs.video.play()

        this.sendEvent('play')
      },

      sendEvent (event, params = null) {
        this.$emit(`Video:${event}`, params)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .puc-video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%) translateZ(0);

    width: 100%;
    height: auto;
    // force rendering for edge / ie11
    min-width: 1px;
    min-height: 1px;
  }
</style>
