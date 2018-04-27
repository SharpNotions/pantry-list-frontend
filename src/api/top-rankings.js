export default {
  listTopRankings() {
    return fetch('/api/top_rankings', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include'
    }).then(response => response.json())
  }
}
