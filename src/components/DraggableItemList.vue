<template>
  <v-list dense three-line :class="{ empty: list.length === 0, 'elevation-1': true }">
    <draggable
      v-model="list"
      :options="options"
      @end="bubbleEvent"
      @add="bubbleEvent"
      @update="bubbleEvent"
      @sort="bubbleEvent"
      @remove="bubbleEvent"
      class="draggable-list"
    >
      <v-list-tile
        avatar
        v-for="(item, index) in list" :key="item.item_name"
        :data-item-id="item.id"
        @click="$emit('item-click', item)"
        class="list-item">
        <v-list-tile-avatar v-if="options.showRankNumber">
          <v-avatar size=30 color="grey">
            <span class="white--text">{{index + 1}}</span>
          </v-avatar>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.item_name"></v-list-tile-title>
          <v-list-tile-sub-title v-if="item.item_details" v-text="item.item_details.description"></v-list-tile-sub-title>
        </v-list-tile-content>

      </v-list-tile>
    </draggable>
  </v-list>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'draggable-item-list',
  components: {
    draggable
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    list: {
      get() {
        return this.items
      },
      set(value) {
        this.$emit('list-change', value)
      }
    }
  },
  methods: {
    hasItemDetails(item) {
      return item.item_details && item.item_details.description
    },
    bubbleEvent(event) {
      this.$emit(event.type, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.draggable-list {
  min-height: 70px;
}
.v-list {
  padding: 0;
}
.v-list__tile__avatar {
  margin-top: 0px;
}
.list-item {
  padding: 0;
}
.list-item + .list-item {
  border-top: 1px lightgrey solid;
}
</style>
