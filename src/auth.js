import Cookie from 'js-cookie'

export default {
  async authorize (token) {
    const inTwentyFourHours = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    Cookie.set('id_token', token, {expires: inTwentyFourHours})
    return Promise.resolve(this.isAuthorized())
  },
  async unauthorize () {
    Cookie.remove('id_token')
    return Promise.resolve(this.isAuthorized())
  },
  isAuthorized () {
    return !!Cookie.get('id_token')
  }
}
