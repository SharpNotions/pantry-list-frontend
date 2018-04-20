<template>
  <v-list two-line :class="{ empty: list.length === 0 }">
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
        v-for="item in list" :key="item.item_name"
        :data-item-id="item.id"
        @click="$emit('item-click', item)"
        class="list-item">
        <v-list-tile-content>
          <v-list-tile-title v-text="item.item_name"></v-list-tile-title>
          <v-list-tile-sub-title v-if="item.item_details" v-text="item.item_details.description"></v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn v-if="hasItemDetails(item)" flat icon @click.stop="$emit('info-click', item)">
            <v-icon color="grey lighten-1">info</v-icon>
          </v-btn>
        </v-list-tile-action>
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
.list {
  &.empty {
    background: none;
  }
}
.list-item + .list-item {
  border-top: 1px lightgrey solid;
}
</style>
