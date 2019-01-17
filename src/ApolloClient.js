import { BatchHttpLink } from 'apollo-link-batch-http'
import { createPersistedQueryLink } from 'apollo-link-persisted-queries'
import { ApolloLink } from 'apollo-link'
import { LoggingLink } from 'apollo-logger'
// import { toIdValue } from 'apollo-utilities'
// import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import Accounts from 'meteor-react-apollo-accounts'

const isDev = true // __DEV__

const dataIdFromObject = result => {
  if (result.__typename) {
    if (result.id !== undefined) {
      return `${result.__typename}:${result.id}`
    }
  }
  return null
}

const cache = new InMemoryCache({
  dataIdFromObject,
  addTypename: true,
  cacheRedirects: {
    Query: {
      // currentUser: (_, args) => toIdValue(dataIdFromObject({ __typename: 'User', id: args._id })),
      // getUser: (_, args) => toIdValue(dataIdFromObject({ __typename: 'User', id: args._id }))
    }
  }
})

const httpLink = createPersistedQueryLink().concat(
  new BatchHttpLink({ uri: isDev ? 'http://localhost:3000/graphql' : 'https://ryfma.com/graphql' })
)

// handle network error
/* const errorLink = onError(({ networkError }) => {
  if (networkError.statusCode === 401) {
    // console.log(networkError)
  }
  // let errorMessage = networkError.statusCode === 401 ? 'Network error 104, handled' : 'link sucess'
  // console.log(errorMessage, networkError)
}) */

// apply widdleware to add access token to request
let middlewareLink = new ApolloLink((operation, forward) => {
  const token = Accounts.getLoginToken()
  operation.setContext({
    headers: {
      'meteor-login-token': token
    },
    // Persisted queries
    http: {
      includeExtensions: true,
      includeQuery: false
    }
  })
  return forward(operation)
})

const link = middlewareLink.concat(httpLink)

const logOptions = { logger: console.log }

export const client = new ApolloClient({
  link: ApolloLink.from((isDev ? [new LoggingLink(logOptions)] : []).concat([link])),
  cache
})
