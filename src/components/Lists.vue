<template>
  <v-container>
    <v-snackbar v-model="hasError" color="red" top multi-line>{{ error }}</v-snackbar>
    <v-subheader class="headline">All Lists</v-subheader>
    <v-list three-line>
      <v-list-tile v-for="(list, index) in allLists" :key="list.id" class="list">
        <v-list-tile-avatar class="title">{{ index + 1 }}</v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-text="list.name_id"></v-list-tile-title>
          <v-list-tile-sub-title>
            <a v-bind:href="getListLink(list)">View List</a>
          </v-list-tile-sub-title>
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
    ...mapState('lists', ['allLists', 'error', 'loading']),
    hasError: {
      get() {
        return !!this.error
      },
      set() {}
    }
  },
  methods: {
    ...mapActions('lists', ['loadAllLists']),
    getListLink(list) {
      return `/#/list/${list.name_id}/my-rankings`
    }
  },
  mounted() {
    this.loadAllLists()
  }
}
</script>

<style lang="scss" scoped>
.ranking-item + .ranking-item {
  border-top: 1px lightgrey solid;
}
</style>
