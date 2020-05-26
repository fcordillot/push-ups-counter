<template>
  <section class="puc-history-items-item u-marg-t-2 f-color-black-near"
           :class="elClasses"
           :style="elStyle">
    <div class="container">
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
    </div>

    <div class="action u-marg-l-2"
         @click="remove">
      <puc-svg-icon icon="trash"></puc-svg-icon>
    </div>
  </section>
</template>

<script>
  // Dependencies
  import TimeAgo from 'javascript-time-ago'
  import en from 'javascript-time-ago/locale/en'

  // Store
  import { GETTERS as G, MUTATIONS as M } from '@/store/helpers'

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
       * Bests UID
       * @param {Array} - *REQUIRED* bestsUid
       **/
      bestsUid: {
        type: Array,
        required: true
      }
    },

    computed: {
      isInBest () {
        return this.bestsUid.includes(this.item.uid)
      },

      bestIndex () {
        return this.isInBest ? this.bestsUid.findIndex(uid => uid === this.item.uid) : null
      },

      icon () {
        return getImage({
          filename: this.isInBest ? `push-ups-counter_${this.bestIndex}-place-medal.png` : 'push-ups-counter_muscle.png'
        })
      },

      historic () {
        return this.$store.getters[G.historic]
      },

      elClasses () {
        return [
          this.isInBest ? `is-best-${this.bestIndex}` : '',
          this.isInBest ? 'is-in-best' : ''
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
      },

      remove () {
        this.$store.commit(M.removeValueToHistoric, this.item.uid)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .puc-history-items-item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:first-child {
      margin-top: 0;
    }
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $base-px * 2;

    background-color: map-get($colors-list, "white-near");
    border-radius: $border-radius * 12;

    .puc-history-items-item.is-best-0 & {
      background-color: rgba(#FED300, 0.75);
    }

    .puc-history-items-item.is-best-1 & {
      background-color: rgba(#989898, 0.75);
    }

    .puc-history-items-item.is-best-2 & {
      background-color: rgba(#813000, 0.75);
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
    .puc-history-items-item.is-best-0 & {
      color: #D18F07;
    }

    .puc-history-items-item.is-best-1 & {
      color: #818185;
    }

    .puc-history-items-item.is-best-2 & {
      color: #873400;
    }
  }

  .action {
    flex-shrink: 0;
    width: $base-px * 4;
    height: $base-px * 4;
    padding: $base-px / 4 * 3;

    background-color: rgba(map-get($colors-list, "delete"), 0.25);
    border-radius: 50%;
    border: 1px solid rgba(map-get($colors-list, "delete"), 0.5);
    color: rgba(map-get($colors-list, "delete"), 0.75);
  }
</style>
