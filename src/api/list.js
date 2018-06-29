import { apolloClient } from '@/graphql'
import UNRANKED_ITEMS from '@/graphql/UnrankedItems.gql'

export default {
  listItems() {
    return apolloClient
      .query({
        query: UNRANKED_ITEMS
      })
      .then(({ data }) => data.items)
  },
  createItem(payload) {
    return fetch('/api/item', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    }).then(response => response.json())
  },
  listUnrankedItems() {
    return fetch('/api/unranked_items', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json())
  },
  listRankedItems() {
    return fetch('/api/user_ranking', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json())
  },
  postItemRank(previousItemId, targetItemId) {
    return fetch('/api/user_ranking', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        prev_item_id: previousItemId,
        item_id: targetItemId
      })
    }).then(response => response.json())
  },
  deleteItemRank() {
    return Promise.resolve()
  }
}
