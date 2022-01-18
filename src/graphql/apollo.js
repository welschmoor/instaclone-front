// reactive variables 

import { makeVar, ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";


export const loggedInVar = makeVar(false)
export const darkModeVar = makeVar(false)

export const client = new ApolloClient({
  uri: "http://localhost:4002/graphql",
  cache: new InMemoryCache(),
})


/// or instead of uri use:

// link: new HttpLink({
//   uri: 'http://localhost:4000',
// })
