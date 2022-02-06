// reactive variables 

import { makeVar, ApolloClient, InMemoryCache, HttpLink, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'

export const loggedInVar = makeVar(Boolean(localStorage.getItem('instapoundtoken')))

// 1 Feb 22 this seems correct:

// old code:
// const httpLink = createHttpLink({
//   uri: "http://localhost:4002/graphql",
// })

// const baseURL = "http://localhost:4002/graphql" //
const baseURL = "/graphql"
const uploadLink = createUploadLink({
  uri: baseURL,
  headers: {
    token: localStorage.getItem("instapoundtoken"),
  }
},)

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem("instapoundtoken"),
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
})


/// or instead of uri use:

// link: new HttpLink({
//   uri: 'http://localhost:4000',
// })
