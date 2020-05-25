<template>
  <p class="puc-text"
     ref="text"
     v-html="text"></p>
</template>

<script>
  export default {
    name: 'PUCText',

    props: {
      text: {
        type: String,
        default: ''
      }
    },

    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  .puc-text {

  }
</style>
