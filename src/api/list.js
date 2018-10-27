import { apolloClient } from '@/graphql'
import UNRANKED_ITEMS from '@/graphql/UnrankedItems.gql'
import http from './http'
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
    return http
      .fetch(url, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(payload)
      })
      .then(response => response.json())
  },
  listUnrankedItems(params) {
    const url = `/api/unranked_items${objToQuery(params)}`
    return http
      .fetch(url, {
        method: 'GET',
        credentials: 'include'
      })
      .then(response => response.json())
  },
  listRankedItems(params) {
    const url = `/api/user_ranking${objToQuery(params)}`
    return http
      .fetch(url, {
        method: 'GET',
        credentials: 'include'
      })
      .then(response => response.json())
  },
  listAllLists() {
    const url = `/api/lists`
    return http
      .fetch(url, {
        method: 'GET',
        credentials: 'include'
      })
      .then(response => response.json())
      .then(lists => lists.filter(list => !!list.name_id))
  },
  postItemRank(previousItemId, targetItemId, params) {
    const url = `/api/user_ranking${objToQuery(params)}`
    return http
      .fetch(url, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          prev_item_id: previousItemId,
          item_id: targetItemId
        })
      })
      .then(response => response.json())
  },
  deleteItemRank(targetItemId, params) {
    const url = `/api/user_ranking${objToQuery(params)}`
    return http.fetch(url, {
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify({
        item_id: targetItemId
      })
    })
  }
}
