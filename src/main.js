import Vue from 'vue'
import router from '@/routes'
import store from '@/store'
import apolloProvider from '@/graphql'
import App from '@/App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import LogRocket from 'logrocket'
LogRocket.init('10-hour-project/pantry-list')

Vue.use(Vuetify)

export default new Vue({
  el: '#app',
  provide: apolloProvider.provide(),
  router,
  store,
  render: h => h(App)
})
