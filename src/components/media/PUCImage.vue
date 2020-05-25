<template>
  <picture class="puc-image">
    <source class="puc-image__el" v-if="allImages[name].formats.wepb" v-bind="allImages[name].formats.wepb" type="image/webp" />

    <source class="puc-image__el" v-if="allImages[name].formats.jpg" v-bind="allImages[name].formats.jpg" type="image/jpg" />

    <source class="puc-image__el" v-if="allImages[name].formats.jpeg" v-bind="allImages[name].formats.jpeg" type="image/jpeg" />

    <source class="puc-image__el" v-if="allImages[name].formats.png" v-bind="allImages[name].formats.png" type="image/png" />

    <img class="puc-image__el" v-bind="allImages[name].formatsArr[0]" />
  </picture>
</template>

<script>
  // Mixins
  import ImagesMixin from '@/mixins/images'

  export default {
    name: 'PUCimage',

    mixins: [ImagesMixin],

    props: {
      name: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .puc-image__el {
    max-width: 100%;
  }
</style>
