<template>
  <v-container>
    <ItemAdder :add-item="addItem"></ItemAdder>
    <v-layout justify-center="">
      <v-progress-circular indeterminate v-if="loading"></v-progress-circular>
    </v-layout>
    <v-list v-if="!loading">
      <v-list-tile v-for="item in items" :key="item.id">
        <v-list-tile-content>
          <v-list-tile-title v-text="item.item_name"></v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>{{ item.votes }}</v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ItemAdder from '@/components/ItemAdder'

export default {
  name: 'list',
  components: {
    ItemAdder
  },
  computed: {
    ...mapState('list', {
      loading: state => state.loading,
      items: state => state.items
    })
  },
  methods: {
    ...mapActions('list', ['addItem'])
  },
  mounted() {
    this.$store.dispatch('list/listItems')
  }
}
</script>
