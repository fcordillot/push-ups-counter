<template>
  <div class="puc-video-loop-container" v-observe-visibility="visibilityOpts">
    <puc-media type="video">
      <div class="puc-video-loop-container__inner"
           :class="innerClass">
        <puc-video-loop v-if="isVisible"
                          :video="video"/>
      </div>
    </puc-media>
  </div>
</template>

<script>
  // Components
  import PUCVideoLoop from '@/components/media/PUCVideoLoop'

  // Mixins
  import visibilityMixin from '@/mixins/visibility'

  // Store
  import { STATE as S } from '@/store/helpers'

  /**
   * Video Loop Container
   * Display video inside container with define aspect ratio (1920 * 1080)
   */
  export default {
    name: 'PUCVideoLoopContainer',

    mixins: [visibilityMixin],

    components: {
      'puc-video-loop': PUCVideoLoop
    },

    props: {
      /**
       * Video Object. Should have .mp4 key and .webm key.
       */
      video: {
        type: Object,
        required: true
      }
    },

    data () {
      return {
        isVisible: false,
        revealVideo: false,
        vRootMargin: `${this.$store.state[S.windowH] * 1.5}px`
      }
    },

    computed: {
      innerClass () {
        return {
          'puc-video-loop__inner--loaded': this.revealVideo
        }
      }
    },

    methods: {
      isVisibleCallback () {
        this.isVisible = true
        window.requestAnimationFrame(() => {
          this.revealVideo = true
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .puc-video-loop-container__inner {
    opacity: 0;
    width: 100%;
    transition: opacity 600ms $bezier--ease--cubic-in-out;

    &.puc-video-loop-container__inner--loaded {
      opacity: 1;
    }
  }
</style>
