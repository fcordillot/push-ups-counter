<template>
  <img class="puc-image-lazy-load"
       ref="img"
       :style="imgLazyLoadStyle"
       v-observe-visibility="visibilityOpts"
       v-bind="sources"
       @load="handleLoad"
       :class="imgClass"/>
</template>

<script>
  // mixins
  import visibilityMixin from '@/mixins/visibility'

  export default {
    name: 'PUCImageLazyLoad',

    mixins: [visibilityMixin],

    props: {
      maxWidth: {
        type: String
      },
      klass: {
        type: String,
        default: ''
      },
      sources: {
        type: Object,
        required: true
      },
      animation: {
        type: Boolean,
        default: true
      },
      animationDuration: {
        type: Number, // time of animation in ms
        default: 800
      },
      rootMargin: {
        type: String,
        default: '-50px'
      },
      threshold: {
        type: [Number, Array],
        default: 0.25
      }
    },

    data () {
      return {
        loaded: false,
        opacity: this.animation ? 0 : 1,
        isAnimating: false,
        isReveal: false,
        vRootMargin: this.rootMargin,
        vThresold: this.threshold,
        reveal: false
      }
    },

    computed: {
      imgClass () {
        return {
          [this.klass]: this.klass.length > 0,
          'puc-image-lazy-load--is-animating': this.isAnimating,
          'puc-image-lazy-load--is-reveal': this.isReveal
        }
      },

      customStyle () {
        return 'style' in this.sources ? this.sources.style : {}
      },

      imgLazyLoadStyle () {
        return {
          maxWidth: this.maxWidth ? `${this.maxWidth}` : '100%',
          opacity: this.opacity,
          transitionDuration: `${this.animationDuration}ms`,
          ...this.customStyle
        }
      }
    },

    methods: {
      isVisibleCallback () {
        this.reveal = true
        // console.log('imageReveal', this.sources.src)
        if (this.isLoaded) {
          this.$nextTick(() => {
            this.revealImage()
          })
        }
      },

      handleLoad () {
        this.isLoaded = true
        // console.log('imageLoaded', this.sources.src)
        this.$emit('img-loaded')
        if (this.reveal) {
          this.$nextTick(() => {
            this.revealImage()
          })
        }
      },

      revealImage () {
        window.setTimeout(() => {
          window.requestAnimationFrame(() => {
            this.isAnimating = true
            this.opacity = 1
            this.isReveal = true
            this.$emit('img-will-reveal')
            window.setTimeout(() => {
              this.$emit('img-reveal')
            }, this.animationDuration + 50)
          })
        }, 50) // 3 frames in theory if user run at 60 fps
      }
    }
  }
</script>

<style lang="scss" scoped>
  .puc-image-lazy-load {
    display: block;
    width: 100%;
    // force rendering for ie11/edge browser
    min-width: 1px;
    min-height: 1px;

    opacity: 0;

    transition-property: opacity;
    transition-timing-function: $bezier--ease--cubic-in-out;
    transition-delay: 15ms;

    &.puc-image-lazy-load--is-reveal {
      opacity: 1;
    }
  }
</style>
