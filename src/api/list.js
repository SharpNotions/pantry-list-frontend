export default {
  listItems () {
    return fetch('/api/items', {
      credentials: 'include'
    }).then(response => response.json())
  }
}
