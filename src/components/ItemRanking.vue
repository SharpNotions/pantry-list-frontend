<template>
  <v-container grid-list-sm>
    <v-snackbar v-model="hasError" color="red" top multi-line>{{ error }}</v-snackbar>
    <v-layout column>
      <v-flex>
        <v-layout justify-center align-center>
          <v-flex>
            <v-autocomplete
              :items="allItems"
              label="Add Something"
              item-text="item_name"
              no-data-text="No items found"
              return-object
              clearable
              @change="onItemSelect"
              >
              <template slot="item" slot-scope="data">
                <v-list-tile-content>
                   <v-list-tile-title v-html="data.item.item_name"></v-list-tile-title>
                   <v-list-tile-sub-title v-html="getDescription(data.item)"></v-list-tile-sub-title>
                </v-list-tile-content>
              </template>
            </v-autocomplete>

          </v-flex>
          <v-flex xs1>
            <item-adder-button @add-item="onCreateItem"></item-adder-button>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex>
        <v-layout row justify-center>
          <v-flex>
            <draggable-item-list
              :items="rankedList"
              :options="{ group: 'ranking', showRankNumber: true }"
              @list-change="onRankedItemsChanged"
              @item-unrank="onUnrankItem"
              @add="onRankedItemAdded"
              @update="onRankedItemReorder"
            >
            </draggable-item-list>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import DraggableItemList from '@/components/DraggableItemList'
import ItemAdderButton from '@/components/ItemAdderButton'

export default {
  name: 'item-ranking',
  components: {
    DraggableItemList,
    ItemAdderButton
  },
  data: function() {
    return {
      rankedListOptions: {
        group: 'ranking',
        sort: true
      }
    }
  },
  computed: {
    rankedList: {
      get() {
        return this.rankedItems
      },
      set(rankedItems) {
        this.setAndLimitRankedItems({
          rankedItems,
          routeParams: this.$route.params
        })
      }
    },
    hasError: {
      get() {
        return !!this.error
      },
      set() {}
    },
    ...mapState('itemRanking', [
      'rankedItems',
      'unrankedItems',
      'error',
      'loading'
    ]),
    ...mapGetters('itemRanking', ['allItems'])
  },
  watch: {
    $route: 'fetchData'
  },
  created() {
    this.fetchData()
  },
  methods: {
    onRankedItemsChanged(rankedItems) {
      this.setAndLimitRankedItems({
        rankedItems,
        routeParams: this.$route.params
      })
    },
    onUnrankItem(item) {
      this.moveItemToUnrankedList({
        item,
        routeParams: this.$route.params
      })
    },
    onCreateItem(event) {
      this.createItem({
        item: event,
        routeParams: this.$route.params
      })
    },
    onRankedItemReorder(event) {
      this.saveItemRank({
        targetId: this.getItemId(event.item),
        routeParams: this.$route.params
      })
    },
    onRankedItemAdded(event) {
      this.saveItemRank({
        targetId: this.getItemId(event.item),
        routeParams: this.$route.params
      })
    },
    getItemId(listItemElement) {
      return parseInt(
        listItemElement.firstChild.attributes['data-item-id'].nodeValue,
        10
      )
    },
    onItemSelect(value) {
      // v-select @change emits a DOM Event and then the selected value on mouse click
      // we only care about the selected value
      if (value && value.item_name) {
        this.moveItemToRankedList({
          item: value,
          routeParams: this.$route.params
        })
      }
    },
    getDescription(item) {
      return item && item.item_details ? item.item_details.description : ''
    },
    fetchData() {
      this.loadItems({
        routeParams: {
          list: this.$route.params.list
        }
      })
    },
    ...mapActions('itemRanking', [
      'loadItems',
      'createItem',
      'moveItemToRankedList',
      'moveItemToUnrankedList',
      'setAndLimitRankedItems',
      'saveItemRank',
      'deleteItemRank'
    ]),
    ...mapMutations('itemRanking', [
      'setUnrankedItems',
      'addRankedItem',
      'removeRankedItem',
      'addUnrankedItem',
      'removeUnrankedItem'
    ])
  }
}
</script>

<style lang="scss" scoped>
.container .layout .flex.ranking-numbers {
  padding-right: 0;
  padding-left: 0;
}
.snack .snack__content .btn .btn__content {
  color: white;
}
</style>
