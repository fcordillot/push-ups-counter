<template>
  <section class="puc-history-items"
           :class="elClasses"
           :style="elStyle">
    <puc-history-items-item v-for="(Item, ItemIndex) in historic"
                            :key="`puc-history-items_item-${ItemIndex}`"
                            :item="Item"
                            :bests-uid="bests">
    </puc-history-items-item>
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

      bests () {
        const best = [...this.historic].sort((a, b) => b.value - a.value)
        return [best[0] ? best[0].uid || null : null, best[1] ? best[1].uid || null : null, best[2] ? best[2].uid || null : null]
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
