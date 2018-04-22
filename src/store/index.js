import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import itemRanking from './item-ranking'
import totalRankings from './total-rankings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    itemRanking,
    totalRankings
  }
})
