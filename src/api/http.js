export default {
  listeners: {
    request: [],
    response: []
  },
  clearInterceptors: function() {
    this.listeners.request.splice(0, this.listeners.request.length)
    this.listeners.response.splice(0, this.listeners.response.length)
  },
  addRequestInterceptor: function(listener) {
    this.listeners.request.push(listener)
  },
  addResponseInterceptor: function(listener) {
    this.listeners.response.push(listener)
  },
  fetch: async function(url, options) {
    await Promise.all(
      this.listeners.request.map(listener => listener(url, options))
    )
    const response = await fetch(url, options)
    await Promise.all(
      this.listeners.response.map(listener => listener(url, options, response))
    )
    return response
  }
}
