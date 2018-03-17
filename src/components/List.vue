<template>
  <div class="list">
    <ItemAdder :add-item="addItem"></ItemAdder>
    <p v-if="loading">Loading...</p>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.label }} - {{ item.votes }} votes
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import store from '@/store'
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
    ...mapActions('list', [
      'addItem'
    ])
  },
  mounted () {
    this.$store.dispatch('list/listItems')
  }
}
</script>

<style lang="scss">
  ul {
    padding: 0 0 0 1em;
  }
</style>
