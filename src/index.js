import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import { client } from './graphql/apollo'
import {
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache
} from '@apollo/client'


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,

  document.getElementById('root')
)