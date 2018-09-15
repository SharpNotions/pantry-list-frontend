import { objToQuery } from './utils'

export default {
  listTopRankings(routeParams) {
    const url = `/api/top_rankings${objToQuery(routeParams)}`
    return fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json())
  }
}
