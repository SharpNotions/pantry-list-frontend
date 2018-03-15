import { mount } from '@vue/test-utils'
import App from 'src/App'

describe('App', () => {
  it('should render', () => {
    const wrapper = mount(App)
    expect(wrapper.html()).toContain('<div id="app">')
  })
})
