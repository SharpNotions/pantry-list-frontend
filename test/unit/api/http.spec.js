import http from '@/api/http'

describe('api/http', () => {
  beforeAll(() => {
    global.fetch = jest.fn(() => Promise.resolve())
  })
  afterAll(() => {
    global.fetch.mockRestore()
  })
  beforeEach(() => {
    global.fetch.mockReset()
    http.clearInterceptors()
  })
  describe('fetch', () => {
    it('should call request listeners', async () => {
      const listener = jest.fn()
      http.addRequestInterceptor(listener)
      await http.fetch('fake-url', {})
      expect(listener.mock.calls.length).toEqual(1)
    })
    it('should call response listener', async () => {
      const listener = jest.fn()
      http.addResponseInterceptor(listener)
      await http.fetch('fake-url', {})
      expect(listener.mock.calls.length).toEqual(1)
    })
    it('should call native fetch method', async () => {
      await http.fetch('fake-url')
      expect(global.fetch.mock.calls.length).toEqual(1)
    })
    it('should reject if a request interceptor rejects', async () => {
      const errorMessage = 'request error'
      const interceptor = jest.fn(() => Promise.reject(new Error(errorMessage)))
      http.addRequestInterceptor(interceptor)
      await expect(http.fetch('fake-url', {})).rejects.toThrow(errorMessage)
    })
    it('should reject if a response interceptor rejects', async () => {
      const errorMessage = 'response error'
      const interceptor = jest.fn(() => Promise.reject(new Error(errorMessage)))
      http.addResponseInterceptor(interceptor)
      await expect(http.fetch('fake-url', {})).rejects.toThrow(errorMessage)
    })
  })
})
