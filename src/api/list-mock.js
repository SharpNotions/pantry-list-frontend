async function resolveEventually (data, waitMs = 500) {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(data), waitMs))
}

export default {
  state: {
    loading: false,
    idCount: 0,
    items: []
  },
  addItem (item = {}) {
    item = {
      label: '',
      votes: 0,
      ...item
    }

    item.id = this.state.idCount++
    this.state.items.push(item)
    localStorage.setItem('items', JSON.stringify(this.state.items))
    return resolveEventually(this.state.items)
  },
  listItems () {
    this.state.items = JSON.parse(
      localStorage.getItem('items') || []
    )
    this.state.idCount = this.state.items.length
    return resolveEventually(this.state.items)
  }
}
