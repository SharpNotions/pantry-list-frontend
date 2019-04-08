import Vue from 'vue'
import router from '@/routes'
import store from '@/store'
import apolloProvider from '@/graphql'
import App from '@/App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Rollbar from 'vue-rollbar'

Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.use(Rollbar, {
  accessToken:
    process.env.rollbar_post_server_item_access_token || 'replace_me',
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: true,
  source_map_enabled: true,
  environment: 'production',
  payload: {
    client: {
      javascript: {
        code_version: '1.0'
      }
    }
  }
})

Vue.config.errorHandler = (err, vm, info) => {
  Vue.rollbar.error(err)
}

export default new Vue({
  el: '#app',
  provide: apolloProvider.provide(),
  router,
  store,
  render: h => h(App)
})
