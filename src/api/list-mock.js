async function resolveEventually(data, waitMs = 500) {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(data), waitMs)
  )
}

const loadRankedItemIds = () =>
  JSON.parse(localStorage.getItem('rankedItemIds') || '[]')

const saveRankedItemIds = rankedItemIds =>
  localStorage.setItem('rankedItemIds', JSON.stringify(rankedItemIds))

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
    return resolveEventually(item)
  },
  listItems() {
    this.state.items = JSON.parse(localStorage.getItem('items') || '[]')
    this.state.rankedItemIds = loadRankedItemIds()
    this.state.idCount = this.state.items.length
    return resolveEventually(
      // Only return items that aren't in the user's ranked list.
      this.state.items.filter(
        item => !this.state.rankedItemIds.some(rankedId => item.id === rankedId)
      )
    )
  },
  listRankedItems() {
    this.state.rankedItemIds = loadRankedItemIds()
    const actualItems = this.state.rankedItemIds.reduce((acc, id) => {
      const item = this.state.items.find(i => i.id === id)
      if (item) acc.push(item)
      return acc
    }, [])
    return resolveEventually(actualItems)
  },
  async postItemRank(previousItemId, itemId) {
    await this.listRankedItems()

    const itemIndex = this.state.rankedItemIds.indexOf(itemId)
    if (itemIndex !== -1) {
      this.state.rankedItemIds.splice(itemIndex, 1)
    }

    const previousItemIndex = this.state.rankedItemIds.indexOf(previousItemId)
    if (previousItemIndex !== -1) {
      this.state.rankedItemIds.splice(previousItemIndex + 1, 0, itemId)
    } else {
      this.state.rankedItemIds.unshift(itemId)
    }

    saveRankedItemIds(this.state.rankedItemIds)
  },
  deleteItemRank(itemId) {
    this.state.rankedItemIds = loadRankedItemIds()
    const itemIndex = this.state.rankedItemIds.indexOf(itemId)
    if (itemIndex !== -1) {
      this.state.rankedItemIds.splice(itemIndex, 1)
      saveRankedItemIds(this.state.rankedItemIds)
    } else {
      return Promise.reject(new Error('Previous item or item ID not found'))
    }
  }
}
