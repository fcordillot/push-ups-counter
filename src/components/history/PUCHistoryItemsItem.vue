<template>
  <section class="puc-history-items-item u-marg-t-2 f-color-black-near"
           :class="elClasses"
           :style="elStyle">
    <div class="f-history-value"
         v-html="item.value">
    </div>

    <div class="u-marg-t-1 f-history-date"
         v-html="relativeDate()">
    </div>
  </section>
</template>

<script>
  // Dependencies
  import TimeAgo from 'javascript-time-ago'
  import en from 'javascript-time-ago/locale/en'

  TimeAgo.addLocale(en)
  const timeAgo = new TimeAgo('en-US')

  export default {
    name: 'PUCHistoryItemsItem',

    props: {
      /**
       * Object w/ properties for an item
       * @param {Object} - *REQUIRED* item
       * @param {Number} - *REQUIRED* item.value: Value
       * @param {String} - *REQUIRED* item.created_at: Created_at
       **/
      item: {
        type: Object,
        required: true
      }
    },

    computed: {
      elClasses () {
        return []
      },

      elStyle () {
        return {}
      }
    },

    methods: {
      // HTML Actions
      relativeDate () {
        const date = new Date(this.item.created_at)

        return timeAgo.format(date)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .puc-history-items-item {
    padding: $base-px * 2;

    background-color: rgba(white, 0.9);
    border-radius: $border-radius * 2;

    &:first-child {
      margin-top: 0;
    }
  }
</style>
