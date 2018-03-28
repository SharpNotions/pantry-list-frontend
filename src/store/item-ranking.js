import api from '@/api/list'

const state = {
  rankedItems: [],
  unrankedItems: [],
  loading: false,
  error: ''
}

const getters = {
  allItems (state) {
    return [
      ...state.unrankedItems,
      ...state.rankedItems
    ]
  }
}

const findItemIndex = function (items, itemToFind) {
  if (!items || !itemToFind) {
    return -1
  }
  return items.findIndex(item => item.item_name === itemToFind.item_name)
}

const mutations = {
  setAllItems (state, items) {
    state.allItems = items
  },
  setRankedItems (state, items) {
    state.rankedItems = items
  },
  setUnrankedItems (state, items) {
    state.unrankedItems = items
  },
  setLoading (state, isLoading) {
    state.loading = isLoading
  },
  setError (state, message) {
    state.error = message
  },
  addRankedItem (state, itemToAdd) {
    if (findItemIndex(state.rankedItems, itemToAdd) === -1) {
      state.rankedItems.push(itemToAdd)
    }
  },
  addUnrankedItem (state, itemToAdd) {
    if (findItemIndex(state.unrankedItems, itemToAdd) === -1) {
      state.unrankedItems.push(itemToAdd)
    }
  },
  removeRankedItem (state, itemToRemove) {
    const index = findItemIndex(state.rankedItems, itemToRemove)
    if (index > -1) {
      state.rankedItems.splice(index, 1)
    }
  },
  removeUnrankedItem (state, itemToRemove) {
    const index = findItemIndex(state.unrankedItems, itemToRemove)
    if (index > -1) {
      state.unrankedItems.splice(index, 1)
    }
  }
}

const actions = {
  async loadItems ({ commit }) {
    try {
      commit('setUnrankedItems', await api.listItems())
      commit('setRankedItems', [])
    } catch (err) {
      commit('setError', 'Something broke')
      console.error(err)
    }
  },
  async createItem ({ commit }, payload) {
    try {
      commit('addRankedItem', await api.createItem(payload))
    } catch (err) {
      commit('setError', 'Oh no, it didn\'t work')
      console.error(err)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
