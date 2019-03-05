import api from '@/api/list'

export const defaultState = {
  allLists: [],
  loading: false,
  error: ''
}

export const mutations = {
  setLists(state, allLists) {
    state.allLists = allLists
  },
  setLoading(state, isLoading) {
    state.loading = isLoading
  },
  setError(state, message) {
    state.error = message
  }
}

export const actions = {
  async loadAllLists({ commit }) {
    commit('setLoading', true)
    try {
      commit('setLists', await api.listAllLists())
    } catch (err) {
      commit('setError', 'Something broke')
      console.error(err)
    }
    commit('setLoading', false)
  }
}

export default {
  namespaced: true,
  state: defaultState,
  actions,
  mutations
}
