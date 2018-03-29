import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'

import { InMemoryCache } from 'apollo-cache-inmemory'
import Cookie from 'js-cookie'

Vue.use(VueApollo)

const httpLink = new HttpLink({
  uri: '/api/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = Cookie.get('id_token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

export { apolloClient }
export default apolloProvider
