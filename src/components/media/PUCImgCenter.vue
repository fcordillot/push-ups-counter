<template functional>
  <div class="puc-img-center">
    <pfmedia type="large"
               :caption="props.caption">
      <pfimage-lazy-load :sources="props.image" />
    </pfmedia>
  </div>
</template>

<script>
  export default {
    name: 'PUCImgCenter',

    props: {
      image: {
        type: Object,
        required: true
      },

      caption: {
        type: [String, Boolean],
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .puc-img-center {
    margin-top: 100px;

    @include breakpoint('large+') {
      margin-top: 120px;
    }
  }
</style>
