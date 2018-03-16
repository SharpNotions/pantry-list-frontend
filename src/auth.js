import Cookie from 'js-cookie'

export default {
  authorize (token) {
    const inTwentyFourHours = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    Cookie.set('id_token', token, {expires: inTwentyFourHours})
  },
  unauthorize () {
    Cookie.remove('id_token')
  },
  isAuthorized () {
    return !!Cookie.get('id_token')
  }
}
