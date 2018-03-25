import Cookie from 'js-cookie'

export default {
  authorize (token, secondsUntilExpiration) {
    const expirationDate = new Date(new Date().getTime() + (secondsUntilExpiration * 1000));
    Cookie.set('id_token', token, {expires: expirationDate})
  },
  unauthorize () {
    Cookie.remove('id_token')
  },
  isAuthorized () {
    return !!Cookie.get('id_token')
  }
}
