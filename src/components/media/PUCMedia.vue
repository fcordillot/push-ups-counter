<template functional>
  <div class="puc-media"
       :class="`puc-media--${props.type}`">
    <div class="puc-media__inner">
      <div class="puc-media__aspect-ratio" :style="{backgroundColor: props.aspectRatioBcg}">
        <div class="puc-media__aspect-ratio-content">
          <!-- @slot Media content inside aspect ratio box-->
          <slot></slot>
        </div>
      </div>
    </div>

    <div v-if="props.caption"
         class="puc-media__caption">
      <span v-html="props.caption"></span>
    </div>
  </div>
</template>

<script>
  /**
   * Media container.
   * Render a media component (Image / video...) inside an aspect ratio box from type.
   */
  export default {
    name: 'PUCMedia',

    props: {
      /**
       * Aspect ratio type. Available values: full-width, large (960 * 535), video (1920 * 1080), Miny Story (375 * 500)
       */
      type: {
        type: String,
        required: true
      },
      /**
       * Background color for aspect ratio box
       */
      aspectRatioBcg: {
        type: String,
        default: 'transparent'
      },
      /**
       * Caption for media
       */
      caption: {
        type: [String, Boolean],
        default: false
      }
    }
  }
</script>

<style lang="scss">
  // Use style here for nested functionnal components
  // @see: https://github.com/vuejs/vue-loader/issues/1259
  .puc-media {
    &.puc-media--slide-intersticiel,
    &.puc-media--p-footer,
    &.puc-media--large,
    &.puc-media--video {
      @extend %container;
      @include margin-container();
      @include breakpoint('medium-') {
        width: 100%;
      }
    }
  }

  .puc-media .puc-media--prologue {
    @extend %container;
    @include breakpoint('medium-') {
      width: 100%;
    }
  }
</style>

<style lang="scss" scoped>
  .puc-media {
    max-width: $max-width;
    margin-left: auto;
    margin-right: auto;
  }

  .puc-media__inner {
    .puc-media--large & {
      @include width-multi((
        large: 10,
        xlarge: 10
      ));

      @include push-multi((
        large: 1,
        xlarge: 1
      ));
    }

    .puc-media--video & {
      @include width-multi((
        large: 12,
        xlarge: 12
      ));

      width: 100%;
    }
  }

  .puc-media__aspect-ratio {
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    @include aspect-ratio(375, 500, 'puc-media__aspect-ratio-content');

    @include breakpoint('medium+') {
      @include aspect-ratio(1280, 800, 'puc-media__aspect-ratio-content');
    }

    /* media types */
    .puc-media--full-width & {
      @include breakpoint('small-') {
        max-width: 375px;
      }
    }

    .puc-media--mini-story & {
      width: 100%;
      @include aspect-ratio(375, 500, 'puc-media__aspect-ratio-content');

      @include breakpoint('small+') {
        max-width: 375px;
      }
    }

    .puc-media--large & {
      width: 100%;
      @include aspect-ratio(960, 535, 'puc-media__aspect-ratio-content');
    }

    .puc-media--video & {
      width: 100%;
      @include aspect-ratio(1920, 1080, 'puc-media__aspect-ratio-content');
    }

    .puc-media--prologue & {
      height: 100%;
      max-width: 138px;
      max-height: 300px;
      @include aspect-ratio(138, 300, 'puc-media__aspect-ratio-content');
    }

    .puc-media--slide-intersticiel & {
      max-width: 760px;
      @include aspect-ratio(760, 480, 'puc-media__aspect-ratio-content');
    }

    .puc-media--p-look & {
      width: 100%;
      @include aspect-ratio(375, 500, 'puc-media__aspect-ratio-content');

      @include breakpoint('medium') {
        @include aspect-ratio(560, 770, 'puc-media__aspect-ratio-content');
      }

      @include breakpoint('large+') {
        @include aspect-ratio(760, 1000, 'puc-media__aspect-ratio-content');
      }
    }
  }

  .puc-media__aspect-ratio-content {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .puc-media__caption {
    text-align: center;
    color: map-get($colors-list, 'white-near');
  }
</style>
