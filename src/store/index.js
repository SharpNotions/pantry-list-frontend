import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import list from './list'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    list
  }
})
