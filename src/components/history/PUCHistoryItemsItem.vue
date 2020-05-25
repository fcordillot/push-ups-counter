<template>
  <section class="puc-history-items-item u-marg-t-2 f-color-black-near"
           :class="elClasses"
           :style="elStyle">
    <div class="icon-and-number">
      <div class="icon-container">
        <img class="icon"
            v-bind="icon.bind" />
      </div>

      <div class="u-marg-l-1 f-history-value"
          v-html="item.value">
      </div>
    </div>

    <div class="date f-history-date f-color-gray"
         v-html="relativeDate()">
    </div>
  </section>
</template>

<script>
  // Dependencies
  import TimeAgo from 'javascript-time-ago'
  import en from 'javascript-time-ago/locale/en'

  // Helpers
  import { getImage } from '@/helpers/assets'

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
      },

      /**
       * Best's UID
       * @param {String} - *REQUIRED* bestUid
       **/
      bestUid: {
        type: String,
        required: true
      }
    },

    computed: {
      isBest () {
        return this.bestUid === this.item.uid
      },

      icon () {
        return getImage({
          filename: this.isBest ? 'push-ups-counter_first-place-medal.png' : 'push-ups-counter_muscle.png'
        })
      },

      elClasses () {
        return [
          this.isBest ? 'is-best' : ''
        ]
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $base-px * 2;

    background-color: map-get($colors-list, "white-near");
    border-radius: $border-radius * 12;

    &.is-best {
      background-color: rgba(#FFD455, 0.80);
    }

    &:first-child {
      margin-top: 0;
    }
  }

  .icon-and-number {
    display: flex;
    align-items: center;
  }

  .icon-container {
    flex-shrink: 0;
    width: $base-px * 4;
    height: $base-px * 4;
    padding: $base-px;

    background-color: white;
    border-radius: $border-radius * 5;
  }

  .icon {
    max-width: 100%;
  }

  .date {
    .puc-history-items-item.is-best & {
      color: white;
    }
  }
</style>
