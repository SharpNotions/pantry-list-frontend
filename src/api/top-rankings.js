import { objToQuery } from './utils'
import http from './http'

export default {
  listTopRankings(routeParams) {
    const url = `/api/top_rankings${objToQuery(routeParams)}`
    return http
      .fetch(url, {
        method: 'GET',
        credentials: 'include'
      })
      .then(response => response.json())
  }
}
