<template>
  <section class="puc-history-items"
           :class="elClasses"
           :style="elStyle">
    <puc-history-items-item v-for="(Item, ItemIndex) in historic"
                            :key="`puc-history-items_item-${ItemIndex}`"
                            :item="Item"
                            :best-uid="best.uid">
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
