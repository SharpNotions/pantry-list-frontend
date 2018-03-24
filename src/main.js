import Vue from 'vue'
import router from '@/routes'
import store from '@/store'
import App from '@/App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
 
Vue.use(Vuetify)

export default new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
