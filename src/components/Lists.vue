<template>
  <v-container>
    <v-subheader class="headline">Lists</v-subheader>
    <v-list three-line>
      <v-list-tile v-for="(item) in items" :key="item.id">
        <v-list-tile-content>
          <v-list-tile-title v-text="item.list_name"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: 'lists',
  data: () => ({
    items: [
      { list_name: 'List 1' },
      { list_name: 'List 2' },
      { list_name: 'List 3' },
      { list_name: 'List 4' }
    ]
  })
}
</script>

<style lang="scss" scoped>
.ranking-item + .ranking-item {
  border-top: 1px lightgrey solid;
}
</style>
