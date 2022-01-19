

import { gql } from "@apollo/client"


export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`

export const SIGNUP = gql`
  mutation CreateAccount($fullName: String!, $username: String!, $email: String!, $password: String!) {
    createAccount(fullName: $fullName, username: $username, email: $email, password: $password) {
      ok
      error
    }
  }
`

// returns current 
export const ME = gql`
  query ME {
    me {
      username
    }
  }
`