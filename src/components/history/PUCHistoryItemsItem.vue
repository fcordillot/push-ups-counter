<template>
  <section class="puc-history-items-item u-marg-t-2 f-color-black-near"
           :class="elClasses"
           :style="elStyle">
    <div class="container"
         @click="share">
      <div class="icon-and-number">
        <div class="icon-container">
          <img class="icon"
               v-bind="icon.bind" />
        </div>

        <div class="u-marg-l-1">
          <div class="f-history-value">
            <span v-html="item.value"></span><span class="f-history-value-small" v-html="' push-ups'"></span>
          </div>

          <div class="duration f-history-date"
               v-html="duration">
          </div>
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

      duration () {
        let duration = this.item.duration
        const ms = String((duration % 1000)).padStart(2, '0').substr(0, 2)

        // Take out milliseconds
        duration = duration / 1000
        const seconds = Math.floor(duration % 60)
        duration = duration / 60
        const minutes = Math.floor(duration % 60)
        duration = duration / 60
        const hours = Math.floor(duration % 24)

        if (hours > 0) {
          return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}min ${String(seconds).padStart(2, '0')}s`
        } else if (minutes > 0) {
          return `${String(minutes).padStart(2, '0')}min ${String(seconds).padStart(2, '0')}s`
        }

        return `${String(seconds).padStart(2, '0')}s`
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
      async share () {
        const data = {
          title: process.env.VUE_APP_SITE_NAME,
          text: `I just did ${this.item.value} push-ups in ${this.duration} with ${process.env.VUE_APP_SITE_NAME} 💪 #PushUpsCounter`,
          url: process.env.VUE_APP_URL
        }

        try {
          await navigator.share(data)
        } catch (err) {
          console.log(`Error= ${err}`)
        }
      },

      relativeDate () {
        const date = new Date(this.item.created_at)

        return timeAgo.format(date)
      },

      remove () {
        const confirm = window.confirm('Do you really want to delete this item from your history?')
        if (confirm) {
          this.$store.commit(M.removeValueToHistoric, this.item.uid)
        }
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
      background-color: #FED300;
    }

    .puc-history-items-item.is-best-1 & {
      background-color: rgba(#989898, 0.5);

      .color-scheme--dark & {
        background-color: #989898;
      }
    }

    .puc-history-items-item.is-best-2 & {
      background-color: #813000;
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

  .duration {
    margin-top: $base-px / 2;
  }

  .date {
    .puc-history-items-item.is-best-0 & {
      color: darken(#FED300, 25%);
    }

    .puc-history-items-item.is-best-1 & {
      color: darken(#989898, 35%);
    }

    .puc-history-items-item.is-best-2 & {
      color: darken(#813000, 15%);
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

    .color-scheme--dark & {
      background-color: rgba(desaturate(map-get($colors-list, "delete"), 25%), 0.25);
      border-radius: 50%;
      border: 1px solid rgba(desaturate(map-get($colors-list, "delete"), 15%), 0.5);
      color: rgba(desaturate(map-get($colors-list, "delete"), 15%), 0.75);
    }
  }
</style>
