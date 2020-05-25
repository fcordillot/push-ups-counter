<template>
  <section class="puc-history-items"
           :class="elClasses"
           :style="elStyle">
    <div class="u-marg-t-2">
      <div class="f-history-title"
           v-html="'BEST:'">
      </div>

      <puc-history-items-item :item="best">
      </puc-history-items-item>
    </div>

    <div class="u-marg-t-4">
      <div class="f-history-title"
           v-html="'LIST:'">
      </div>

      <puc-history-items-item v-for="(Item, ItemIndex) in historic"
                              :key="`puc-history-items_item-${ItemIndex}`"
                              :item="Item">
      </puc-history-items-item>
    </div>
  </section>
</template>

<script>
  // Store
  import { GETTERS as G } from '@/store/helpers'

  // Components
  import PUCHistoryItemsItem from './PUCHistoryItemsItem'

  export default {
    name: 'PUCHistoryItems',

    components: {
      'puc-history-items-item': PUCHistoryItemsItem
    },

    computed: {
      historic () {
        const historic = [...this.$store.getters[G.historic]]
        const historicReversed = historic.reverse()

        return historicReversed
      },

      best () {
        return [...this.historic].sort((a, b) => b.value - a.value)[0]
      },

      elClasses () {
        return []
      },

      elStyle () {
        return {}
      }
    }
  }
</script>

<style lang="scss" scoped>
  .puc-history-items {
    margin-top: $base-px * 10;

    padding-right: $base-px * 2;
    padding-left: $base-px * 2;
  }
</style>
