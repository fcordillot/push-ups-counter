<template>
  <div class="phistory u-pad-b-2 f-color-white"
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
  </div>
</template>

<script>
  // Mixins
  import PageMixin from '@/mixins/page'

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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .phistory {
    position: relative;

    min-height: calc(var(--vh, 1vh) * 100);

    background-color: map-get($colors-list, "black-near");
  }

  .phistory__header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;

    display: inline-block;
    width: 100%;
    padding: $base-px * 4 $base-px * 2;

    background-color: map-get($colors-list, "black-near");
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
