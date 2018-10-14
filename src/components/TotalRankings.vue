<template>
  <v-container>
    <v-snackbar v-model="hasError" color="red" top multi-line>{{ error }}</v-snackbar>
    <v-list three-line>
      <v-list-tile v-for="(item, index) in items" :key="item.id" class="ranking-item">
        <v-list-tile-avatar class="title">{{ index + 1 }}</v-list-tile-avatar>
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
    ...mapState('totalRankings', ['items', 'error', 'loading']),
    hasError: {
      get() {
        return !!this.error
      },
      set() {}
    }
  },
  methods: {
    getDescription(item) {
      return item && item.item_details ? item.item_details.description : ''
    },
    ...mapActions('totalRankings', ['loadItems'])
  },
  mounted() {
    this.loadItems({
      routeParams: this.$route.params
    })
  }
}
</script>

<style lang="scss" scoped>
.ranking-item + .ranking-item {
  border-top: 1px lightgrey solid;
}
</style>
