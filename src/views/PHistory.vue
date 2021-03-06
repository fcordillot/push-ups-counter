<template>
  <div class="phistory u-pad-b-4 f-color-black-near"
       :class="elClasses">
    <div class="phistory__header">
      <router-link :to="{ name: 'home' }">
        <div class="phistory__header-container">
          <div class="phistory__header-icon">
            <puc-svg-icon icon="back"></puc-svg-icon>
          </div>

          <div class="u-marg-l-1 f-back"
                v-html="'Back'">
          </div>
        </div>
      </router-link>
    </div>

    <puc-history-items></puc-history-items>

    <div v-if="historic.length > 0"
         class="u-marg-t-6 u-pad-y-2 f-history-clear f-color-delete u-align-center"
         v-html="'Clear my history'"
         @click="clearHistory">
    </div>

    <div v-else
         class="f-history-clear f-color-gray u-align-center"
         v-html="'No history yet.'">
    </div>
  </div>
</template>

<script>
  // Mixins
  import PageMixin from '@/mixins/page'

  // Store
  import { GETTERS as G, MUTATIONS as M } from '@/store/helpers'

  // Helpers
  import { EventBus } from '@/helpers/event-bus'
  import { enableScroll } from '@/helpers/scroll'

  // Components
  import PUCHistoryItems from '@/components/history/PUCHistoryItems'

  export default {
    name: 'PHistory',
    pageName: 'history',
    mixins: [PageMixin],

    components: {
      'puc-history-items': PUCHistoryItems
    },

    computed: {
      historic () {
        return this.$store.getters[G.historic]
      },

      elClasses () {
        return [

        ]
      }
    },

    created () {
      // Events
      EventBus.$on('resize', this._onResize)
    },

    async mounted () {
      await this.$nextTick()

      this._onResize()
      enableScroll()
    },

    beforeDestroy () {
      // Events
      EventBus.$off('resize', this._onResize)
    },

    methods: {
      // Events
      _onResize () {
        let vh = window.innerHeight * 0.01
        // Then we set the value in the --vh custom property to the root of the document
        this.$el.style.setProperty('--vh', `${vh}px`)
      },

      // HTML Actions
      clearHistory () {
        const confirm = window.confirm('Do you really want to clean ALL your history?')
        if (confirm) {
          this.$store.commit(M.clearHistory)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .phistory {
    position: relative;

    padding-top: $base-px * 10;
  }

  .phistory__header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;

    display: inline-block;
    width: 100%;
    padding: $base-px * 3 $base-px * 2;

    background-color: rgba(white, 0.6);
    backdrop-filter: blur(2px);

    .color-scheme--dark & {
      background-color: rgba(map-get($colors-list, "black-near"), 0.6);
      color: white;
    }
  }

  .phistory__header-container {
    display: flex;
    align-items: center;
  }

  .phistory__header-icon {
    width: $base-px * 2;
    height: $base-px * 2;
  }
</style>
