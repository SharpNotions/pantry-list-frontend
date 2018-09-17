<template>
  <v-container grid-list-lg>
    <v-snackbar v-model="hasError" color="red" top multi-line>{{ error }}</v-snackbar>
    <v-layout column>
      <v-flex>
        <v-layout justify-center align-center>
          <v-flex>
            <v-autocomplete
              :items="allItems"
              label="What are you hungry for?"
              item-text="item_name"
              no-data-text="No items found"
              return-object
              clearable
              @change="onItemSelect"
              >
              <template slot="item" slot-scope="data">
                <v-list-tile-content>
                   <v-list-tile-title v-html="data.item.item_name"></v-list-tile-title>
                   <v-list-tile-sub-title v-html="data.item.item_details.description"></v-list-tile-sub-title>
                </v-list-tile-content>
              </template>
            </v-autocomplete>

          </v-flex>
          <v-flex xs1>
            <item-adder-button @add-item="createItem"></item-adder-button>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex>
        <v-layout row justify-center>
          <v-flex>
            <v-subheader class="title">My Ranking</v-subheader>
            <draggable-item-list
              :items="rankedList"
              :options="{ group: 'ranking', showRankNumber: true }"
              @list-change="setAndLimitRankedItems"
              @info-click="showItemInfo"
              @item-click="moveItemToUnrankedList"
              @add="onRankedItemAdded"
              @remove="onRankedItemRemoved"
              @update="onRankedItemReorder"
            >
            </draggable-item-list>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-dialog v-model="infoDialog" max-width="500px">
      <v-card>
        <v-card-title primary-title>
          <div class="headline">{{ infoDialogItem.item_name }}</div>
        </v-card-title>
        <v-card-text>{{ infoDialogItem.item_details ? infoDialogItem.item_details.description : '' }}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="hideItemInfo()">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      },
      unrankedListOptions: {
        group: 'ranking',
        sort: true
      },
      infoDialog: false,
      infoDialogItem: {},
      selectedItem: null
    }
  },
  computed: {
    rankedList: {
      get() {
        return this.rankedItems
      },
      set(value) {
        this.setAndLimitRankedItems(value)
      }
    },
    unrankedList: {
      get() {
        return this.unrankedItems
      },
      set(value) {
        this.setUnrankedItems(value)
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
  methods: {
    onRankedItemReorder(event) {
      this.saveItemRank(this.getItemId(event.item))
    },
    onRankedItemAdded(event) {
      this.saveItemRank(this.getItemId(event.item))
    },
    onRankedItemRemoved(event) {
      this.deleteItemRank(this.getItemId(event.item))
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
        this.moveItemToRankedList(value)
      }
    },
    showItemInfo(item) {
      this.infoDialog = true
      this.infoDialogItem = item
    },
    hideItemInfo() {
      this.infoDialog = false
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
  },
  mounted() {
    this.loadItems()
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
