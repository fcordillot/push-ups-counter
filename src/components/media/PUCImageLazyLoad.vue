<template>
  <div class="puc-image-lazy-load"
       :class="containerClass"
       :style="{backgroundColor: `${bcgColor}`}"
       v-observe-visibility="visibilityOpts">
    <puc-image-lazy-load-item v-if="canLoadImage"
                                :maxWidth="maxWidth"
                                :klass="klass"
                                :animation="animation"
                                :animationDuration="animationDuration"
                                :rootMargin="innerRootMargin"
                                :treshold="innerThreshold"
                                :sources="sources"
                                @img-will-reveal="imgWillReveal"
                                @img-reveal="imgReveal"
                                @img-loaded="imgIsLoaded" />
  </div>
</template>

<script>
  // Mixins
  import visibilityMixin from '@/mixins/visibility'

  // Components
  import PUCImageLazyLoadItem from '@/components/media/PUCImageLazyLoadItem'

  // Store
  import { STATE as S } from '@/store/helpers'

  /**
   * ImageLazyLoad
   * Container component which implement lazy-load item child component
   * This component has two Intersection Observer instances.
   * First IO for launch loading of images. Second IO to run reveal animation when element is inside viewport
   */
  export default {
    name: 'PUCImageLazyLoad',

    mixins: [visibilityMixin],

    components: {
      'puc-image-lazy-load-item': PUCImageLazyLoadItem
    },

    props: {
      /**
       * Lazy-load image max width
       */
      maxWidth: {
        type: String,
        default: 'none'
      },
      /**
       * Custom css class apply to lazy load image
       */
      klass: {
        type: String,
        default: ''
      },
      /**
       * Image Object. Should have src / srcSet / sizes / alt keys
       */
      sources: {
        type: Object,
        required: true
      },
      /**
       * Reveal lazy-load image with animation
       */
      animation: {
        type: Boolean,
        default: true
      },
      /**
       * Animation duration of fade to reveal lazy load item
       */
      animationDuration: {
        type: Number,
        default: 500
      },
      /**
       * Root margin values pass to child Lazy load Item Intersection-Observer
       */
      innerRootMargin: {
        type: String,
        default: '-50px'
      },
      /**
       * Threshold values pass to child Lazy load Item Intersection-Observer
       */
      innerThreshold: {
        type: [Number, Array],
        default: 0
      },
      /**
       * Threshold values of parent Lazy load Item Intersection-Observer
       */
      threshold: {
        type: [Number, Array],
        default: 0
      },
      /**
       * Background color Lazy load Item
       */
      bcgColor: {
        type: String,
        default: 'transparent'
      }
    },

    data () {
      return {
        canLoadImage: false,
        vRootMargin: `${this.$store.state[S.windowH] * 1.5}px`,
        vThresold: this.threshold,
        imgIsReveal: false
      }
    },

    computed: {
      containerClass () {
        return {
          [this.klass]: this.klass.length > 0,
          'puc-image-lazy-load__container--reveal': this.imgIsReveal
        }
      }
    },

    methods: {
      isVisibleCallback () {
        this.canLoadImage = true
      },

      imgIsLoaded () {
        /**
         * Event send when image is loaded
         */
        this.$emit('lazy-loaded')
      },

      imgReveal () {
        this.$nextTick(() => {
          this.imgIsReveal = true
          /**
           * Event send when item is revealed
           */
          this.$emit('lazy-reveal')
        })
      },

      imgWillReveal () {
        this.$nextTick(() => {
          this.$emit('lazy-will-reveal')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .puc-image-lazy-load__container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    // force rendering for ie11/edge browser
    min-width: 30px;
    min-height: 30px;

    &.puc-image-lazy-load__container--reveal {
      background-color: transparent;
    }
  }
</style>
