<template>
  <div>
  <v-list dense class="mt-3">
    <v-list-tile v-if="loading">
      <v-list-tile-content>
        <v-list-tile-title>
          Loading Lists...
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile v-for="(list, index) in allLists" :key="list.id" class="list" @click="selectList" :data-index="index">
      <v-list-tile-action>
        <v-icon>subject</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title v-text="list.name_id"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'lists',
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
    selectList(list) {
      console.log('LIST: ', list)
      this.$router.push({
        name: 'ItemRanking',
        params: {
          list: list.name_id
        }
      })
    },
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
