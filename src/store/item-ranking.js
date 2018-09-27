// import api from '@/api/list-mock'
import api from '@/api/list'

export const defaultState = {
  maxRankedItems: 10,
  rankedItems: [],
  unrankedItems: [],
  loading: false,
  error: ''
}

export const getters = {
  allItems(state) {
    return [...state.unrankedItems, ...state.rankedItems]
  }
}

export const findItemIndex = function(items, itemToFind) {
  if (!items || !itemToFind) {
    return -1
  }
  return items.findIndex(item => item.item_name === itemToFind.item_name)
}

const getPreceedingItemId = (items = [], itemId) => {
  const itemIndex = items.findIndex(i => i.id === itemId)
  return itemIndex > 0 ? items[itemIndex - 1].id : null
}

export const getLastItem = items => items[items.length - 1]

export const mutations = {
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

export const actions = {
  async loadItems({ commit }, { routeParams }) {
    commit('setLoading', true)
    try {
      commit('setUnrankedItems', await api.listUnrankedItems(routeParams))
      commit('setRankedItems', await api.listRankedItems(routeParams))
    } catch (err) {
      commit('setError', 'Something broke')
      console.error(err)
    }
    commit('setLoading', false)
  },
  async createItem({ commit, dispatch }, { item, routeParams }) {
    try {
      const newItem = await api.createItem(item, routeParams)
      commit('addRankedItem', newItem)
      await dispatch('saveItemRank', {
        targetId: newItem.id,
        routeParams
      })
    } catch (err) {
      commit('setError', "Oh no, it didn't work")
      console.error(err)
    }
  },
  async moveItemToRankedList(
    { commit, dispatch, state },
    { item, routeParams }
  ) {
    try {
      if (state.rankedItems.length >= state.maxRankedItems) {
        const itemToMove = getLastItem(state.rankedItems)
        commit('addUnrankedItem', itemToMove)
        commit('removeRankedItem', itemToMove)

        // Save changes to server.
        // TODO: Recover if save fails.
        await dispatch('deleteItemRank', {
          targetId: itemToMove.id,
          routeParams
        })
      }
      commit('addRankedItem', item)
      commit('removeUnrankedItem', item)

      // Save changes to server.
      // TODO: Recover if save fails.
      await dispatch('saveItemRank', {
        targetId: item.id,
        routeParams
      })
    } catch (err) {
      commit('setError', err.message)
    }
  },
  async moveItemToUnrankedList(
    { commit, dispatch, state },
    { item, routeParams }
  ) {
    try {
      commit('addUnrankedItem', item)
      commit('removeRankedItem', item)

      await dispatch('deleteItemRank', {
        targetId: item.id,
        routeParams
      })
    } catch (err) {
      commit('setError', err.message)
    }
  },
  setAndLimitRankedItems({ commit, state }, { rankedItems = [], routeParams }) {
    // Move excess ranked items back over to unranked list.
    if (rankedItems.length > state.maxRankedItems) {
      rankedItems
        .slice(state.maxRankedItems, rankedItems.length)
        .forEach(item => commit('addUnrankedItem', item))
      rankedItems = rankedItems.slice(0, state.maxRankedItems)
    }
    commit('setRankedItems', rankedItems)
  },
  async saveItemRank({ commit, state }, { targetId, routeParams }) {
    try {
      await api.postItemRank(
        getPreceedingItemId(state.rankedItems, targetId),
        targetId,
        routeParams
      )
    } catch (err) {
      commit('setError', err.message)
    }
  },
  async deleteItemRank({ commit, state }, { targetId, routeParams }) {
    try {
      await api.deleteItemRank(targetId, routeParams)
    } catch (err) {
      commit('setError', err.message)
    }
  }
}

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations
}
