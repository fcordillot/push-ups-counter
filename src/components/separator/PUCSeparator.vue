<template>
  <div class="puc-separator u-bg-color--white-near"
       :style="elStyle">
  </div>
</template>

<script>
  export default {
    name: 'PUCSeparator',

    props: {
      margins: {
        type: Array,
        default: () => []
      },

      width: {
        type: String,
        default: '100%'
      },

      height: {
        type: String,
        default: '100%'
      }
    },

    computed: {
      elStyle () {
        return {
          'margin-top': this.margins && this.margins[0] ? this.margins[0] : '',
          'margin-right': this.margins && this.margins[1] ? this.margins[1] : '',
          'margin-bottom': this.margins && this.margins[2] ? this.margins[2] : '',
          'margin-left': this.margins && this.margins[3] ? this.margins[3] : '',
          'width': this.width,
          'height': this.height
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
