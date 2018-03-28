export default {
  listItems () {
    return fetch('/api/items', {
      credentials: 'include'
    })
      .then(response => response.json())
  },
  createItem (payload) {
    return fetch('/api/item', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
  } 
}
