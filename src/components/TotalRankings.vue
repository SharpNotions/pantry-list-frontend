<template>
  <v-container>
    <v-subheader class="headline">Total Rankings</v-subheader>
    <v-list three-line>
      <v-list-tile v-for="item in items" :key="item.rank" class="ranking-item">
        <v-list-tile-avatar class="title">{{ item.rank }}</v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.item_name"></v-list-tile-title>
          <v-list-tile-sub-title>{{ getDescription(item) || '&nbsp;' }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'total-rankings',
  computed: {
    ...mapState('totalRankings', [
      'items',
      'error',
      'loading'
    ])
  },
  methods: {
    getDescription(item) {
      return item && item.item_details ?
        item.item_details.description : '';
    },
    ...mapActions('totalRankings', [
      'loadItems'
    ])
  },
  mounted() {
    this.loadItems()
  }
}
</script>

<style lang="scss" scoped>
.ranking-item + .ranking-item {
  border-top: 1px lightgrey solid;
}
</style>
