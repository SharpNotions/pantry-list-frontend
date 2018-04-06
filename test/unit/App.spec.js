import { createLocalVue, mount } from '@vue/test-utils'
import App from '@/App'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'

describe('App', () => {
  let localVue
  let wrapper

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuetify)
    localVue.use(VueRouter)
    wrapper = mount(App, { localVue, stubs: ['router-view'] })
  })

  it('should render', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
