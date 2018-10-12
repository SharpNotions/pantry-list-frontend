import { apolloClient } from '@/graphql'
import UNRANKED_ITEMS from '@/graphql/UnrankedItems.gql'
import { objToQuery } from './utils'

export default {
  listItems() {
    return apolloClient
      .query({
        query: UNRANKED_ITEMS
      })
      .then(({ data }) => data.items)
  },
  createItem(payload, params) {
    const url = `/api/item${objToQuery(params)}`
    return fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    }).then(response => response.json())
  },
  listUnrankedItems(params) {
    const url = `/api/unranked_items${objToQuery(params)}`
    return fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json())
  },
  listRankedItems(params) {
    const url = `/api/user_ranking${objToQuery(params)}`
    return fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json())
  },
  listAllLists() {
    const url = `/api/lists`
    return fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include'
    })
      .then(response => response.json())
      .then(lists => lists.filter(list => !!list.name_id))
  },
  postItemRank(previousItemId, targetItemId, params) {
    const url = `/api/user_ranking${objToQuery(params)}`
    return fetch(url, {
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
  deleteItemRank(targetItemId, params) {
    const url = `/api/user_ranking${objToQuery(params)}`
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        item_id: targetItemId
      })
    })
  }
}
