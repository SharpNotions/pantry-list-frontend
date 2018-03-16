let isAuthorized = false
export default {
  async authorize () {
    isAuthorized = true
    return Promise.resolve(isAuthorized)
  },
  async unauthorize () {
    isAuthorized = false
    return Promise.resolve(isAuthorized)
  },
  isAuthorized () {
    return isAuthorized
  }
}
