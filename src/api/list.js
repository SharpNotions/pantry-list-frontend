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
  }
}
