import { createLocalVue, mount } from '@vue/test-utils'
import App from '@/App'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('App', () => {
  let localVue
  let wrapper
  let store

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuetify)
    localVue.use(VueRouter)
    localVue.use(Vuex)
    store = new Vuex.Store({
      state: {
        loading: false
      },
      getters: {
        loading: state => state.loading
      }
    })
    wrapper = mount(App, {
      localVue,
      store,
      stubs: ['router-view', 'v-btn', 'v-progress']
    })
  })

  it('should render', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
