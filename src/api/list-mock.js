async function resolveEventually(data, waitMs = 500) {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(data), waitMs)
  )
}

export default {
  state: {
    loading: false,
    idCount: 0,
    items: [],
    rankedItems: []
  },
  createItem(item = {}) {
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
  listItems() {
    this.state.items = JSON.parse(localStorage.getItem('items') || '[]')
    this.state.rankedItems = JSON.parse(
      localStorage.getItem('rankedItems') || '[]'
    )
    this.state.idCount = this.state.items.length
    return resolveEventually(
      // Only return items that aren't in the user's ranked list.
      this.state.items.filter(
        item => !this.state.rankedItems.some(ranked => item.id === ranked.id)
      )
    )
  },
  listRankedItems() {
    this.state.rankedItems = JSON.parse(
      localStorage.getItem('rankedItems') || '[]'
    )
    return resolveEventually(this.state.rankedItems)
  },
  saveRankedItems(rankedItems) {
    this.state.rankedItems = rankedItems
    localStorage.setItem('rankedItems', JSON.stringify(this.state.rankedItems))
    return resolveEventually(rankedItems)
  }
}
