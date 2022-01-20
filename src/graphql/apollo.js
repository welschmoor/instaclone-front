// reactive variables 

import { makeVar, ApolloClient, InMemoryCache, HttpLink, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context'

export const loggedInVar = makeVar(Boolean(localStorage.getItem('instapoundtoken')))


const httpLink = createHttpLink({
  uri: "http://localhost:4002/graphql",
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem("instapoundtoken"),
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})


/// or instead of uri use:

// link: new HttpLink({
//   uri: 'http://localhost:4000',
// })
