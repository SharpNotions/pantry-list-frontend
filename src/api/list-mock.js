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
    rankedItemIds: []
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
    this.state.rankedItemIds = JSON.parse(
      localStorage.getItem('rankedItemIds') || '[]'
    )
    this.state.idCount = this.state.items.length
    return resolveEventually(
      // Only return items that aren't in the user's ranked list.
      this.state.items.filter(
        item => !this.state.rankedItemIds.some(rankedId => item.id === rankedId)
      )
    )
  },
  listRankedItems() {
    this.state.rankedItemIds = JSON.parse(
      localStorage.getItem('rankedItemIds') || '[]'
    )
    return resolveEventually(this.state.rankedItemIds)
  },
  postItemRank(previousItemId, itemId) {
    if (!previousItemId) {
      this.state.rankedItemIds.push(itemId)
    } else {
      const previousItemIndex = this.state.rankedItemIds.indexOf(previousItemId)
      const itemIndex = this.state.rankedItemIds.indexOf(itemId)
      // Use bitwise operators to convert -1 to 0 if item not in array.
      if (~previousItemIndex && !~itemIndex) {
        this.state.rankedItemsIds.splice(previousItemIndex, 0, itemIndex)
        // TODO: Limit to `n` items in ranked array.
      } else {
        return Promise.reject(new Error('Previous item or item ID not found'))
      }
    }
  },
  deleteItemRank(itemId) {
    const itemIndex = this.state.rankedItemIds.indexOf(itemId)
    // Use bitwise operators to convert -1 to 0 if item not in array.
    if (!~itemIndex) {
      this.state.rankedItemsIds.splice(itemIndex, 1)
    } else {
      return Promise.reject(new Error('Previous item or item ID not found'))
    }
  }
}
