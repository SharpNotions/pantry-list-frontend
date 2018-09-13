import api from '@/api/top-rankings'

const state = {
  items: [],
  loading: false,
  error: ''
}

const mutations = {
  setItems(state, items) {
    state.items = items
  },
  setLoading(state, isLoading) {
    state.loading = isLoading
  },
  setError(state, message) {
    state.error = message
  }
}

const actions = {
  async loadItems({ commit }) {
    try {
      commit('setLoading', true)
      const items = await api.listTopRankings()
      commit('setItems', items.fiboRankings)
      commit('setLoading', false)
    } catch (err) {
      commit('setLoading', false)
      commit('setError', err.message)
      console.error(err)
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
