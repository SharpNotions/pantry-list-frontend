<template>
  <v-container grid-list-lg>
    <v-snackbar v-model="hasError" color="red" top multi-line>{{ error }}</v-snackbar>
    <v-layout column>
      <v-flex>
        <v-layout justify-center align-center>
          <v-flex xs9>
            <v-select
              :items="allItems"
              item-text="item_name"
              placeholder="Search"
              no-data-text="No items found"
              autocomplete
              clearable
              @change="onItemSelect"
            ></v-select>
          </v-flex>
          <v-flex xs1>
            <item-adder-button @add-item="createItem"></item-adder-button>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex>
        <v-layout row justify-center>
          <v-flex class="ranking-numbers">
            <v-subheader class="title"></v-subheader>
            <v-list two-line>
              <v-list-tile v-for="rank in rankedList.length" :key="rank">
                <v-list-tile-title v-text="rank" class="text-xs-right grey--text"></v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-flex>
          <v-flex xs6>
            <v-subheader class="title">My Ranking</v-subheader>
            <draggable-item-list
              :items="rankedList"
              :options="{ group: 'ranking' }"
              @list-change="setRankedItems"
              @info-click="showItemInfo"
              @item-click="moveItemToUnrankedList">
            </draggable-item-list>
          </v-flex>
          <v-flex xs6>
            <v-subheader class="title">Unranked Items</v-subheader>
            <draggable-item-list
              :items="unrankedList"
              :options="{ group: 'ranking' }"
              @list-change="setUnrankedItems"
              @info-click="showItemInfo"
              @item-click="moveItemToRankedList">
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
        this.setRankedItems(value)
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
    hasError() {
      return !!this.error
    },
    ...mapState('itemRanking', ['rankedItems', 'unrankedItems', 'error']),
    ...mapGetters('itemRanking', ['allItems'])
  },
  methods: {
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
      'setRankedItems'
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
  .list {
    background: none;
  }
}
.snack .snack__content .btn .btn__content {
  color: white;
}
</style>
