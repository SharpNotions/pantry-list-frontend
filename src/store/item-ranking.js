import api from '@/api/list'

const state = {
  maxRankedItems: 10,
  rankedItems: [],
  unrankedItems: [],
  loading: false,
  error: ''
}

const getters = {
  allItems(state) {
    return [...state.unrankedItems, ...state.rankedItems]
  }
}

const findItemIndex = function(items, itemToFind) {
  if (!items || !itemToFind) {
    return -1
  }
  return items.findIndex(item => item.item_name === itemToFind.item_name)
}

const mutations = {
  setAllItems(state, items) {
    state.allItems = items
  },
  setRankedItems(state, items) {
    state.rankedItems = items
  },
  setUnrankedItems(state, items) {
    state.unrankedItems = items
  },
  setLoading(state, isLoading) {
    state.loading = isLoading
  },
  setError(state, message) {
    state.error = message
  },
  addRankedItem(state, itemToAdd) {
    if (findItemIndex(state.rankedItems, itemToAdd) === -1) {
      state.rankedItems.push(itemToAdd)
    }
  },
  addUnrankedItem(state, itemToAdd) {
    if (findItemIndex(state.unrankedItems, itemToAdd) === -1) {
      state.unrankedItems.push(itemToAdd)
    }
  },
  removeRankedItem(state, itemToRemove) {
    const index = findItemIndex(state.rankedItems, itemToRemove)
    if (index > -1) {
      state.rankedItems = [
        ...state.rankedItems.slice(0, index),
        ...state.rankedItems.slice(index + 1)
      ]
    }
  },
  removeUnrankedItem(state, itemToRemove) {
    const index = findItemIndex(state.unrankedItems, itemToRemove)
    if (index > -1) {
      state.unrankedItems = [
        ...state.unrankedItems.slice(0, index),
        ...state.unrankedItems.slice(index + 1)
      ]
    }
  }
}

const actions = {
  async loadItems({ commit }) {
    try {
      commit('setUnrankedItems', await api.listItems())
      commit('setRankedItems', [])
    } catch (err) {
      commit('setError', 'Something broke')
      console.error(err)
    }
  },
  async createItem({ commit }, payload) {
    try {
      commit('addRankedItem', await api.createItem(payload))
    } catch (err) {
      commit('setError', "Oh no, it didn't work")
      console.error(err)
    }
  },
  moveItemToRankedList({ commit, state }, item) {
    try {
      if (state.rankedItems.length >= state.maxRankedItems) {
        commit(
          'addUnrankedItem',
          state.rankedItems[state.rankedItems.length - 1]
        )
        commit(
          'removeRankedItem',
          state.rankedItems[state.rankedItems.length - 1]
        )
      }
      commit('addRankedItem', item)
      commit('removeUnrankedItem', item)
    } catch (err) {
      commit('setError', err.message)
    }
  },
  moveItemToUnrankedList({ commit }, item) {
    try {
      commit('addUnrankedItem', item)
      commit('removeRankedItem', item)
    } catch (err) {
      commit('setError', err.message)
    }
  },
  setRankedItems({ commit, state }, rankedItems = []) {
    // Move excess ranked items back over to unranked list.
    if (rankedItems.length > state.maxRankedItems) {
      rankedItems
        .slice(state.maxRankedItems - 1, rankedItems.length)
        .forEach(item => commit('addUnrankedItem', item))
      rankedItems = rankedItems.slice(0, state.maxRankedItems)
    }
    commit('setRankedItems', rankedItems)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
