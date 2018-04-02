// import api from '@/api/list-mock'
import api from '@/api/list'

const state = {
  alert: '',
  loading: false,
  items: []
}

const mutations = {
  loading(state, isLoading) {
    state.loading = isLoading
  },
  error(state, message) {
    state.alert = message
  },
  setItems(state, items) {
    state.items = items
  }
}

const actions = {
  async listItems({ commit }) {
    commit('loading', true)
    try {
      commit('setItems', await api.listItems())
      commit('loading', false)
    } catch (error) {
      commit('error', error.message)
      commit('loading', false)
    }
  },
  async addItem({ commit }, label) {
    commit('loading', true)
    try {
      const items = await api.addItem({ label })
      commit('setItems', items)
      commit('loading', false)
    } catch (error) {
      commit('error', error.message)
      commit('loading', false)
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
