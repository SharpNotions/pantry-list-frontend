import Vue from 'vue'
import Vuex from 'vuex'
import LogRocket from 'logrocket'
import createPlugin from 'logrocket-vuex'

// Modules
import itemRanking from './item-ranking'
import totalRankings from './total-rankings'

// LogRocket.init('10-hour-project/pantry-list')
// const logrocketPlugin = createPlugin(LogRocket)

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    itemRanking,
    totalRankings
  },
  getters: {
    loading(state) {
      return state.itemRanking.loading || state.totalRankings.loading
    }
  } // ,
  // plugins: [logrocketPlugin]
})
