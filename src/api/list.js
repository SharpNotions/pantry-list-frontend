import Cookie from 'js-cookie'

export default {
  listItems () {
    return fetch('/api/items', {
      headers: {
        authorization: `Bearer ${Cookie.get('id_token')}`
      }
    }).then(response => response.json())
  }
}
