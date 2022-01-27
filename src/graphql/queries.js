

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

// returns current logged in user by sending token to BE for a check
export const ME = gql`
  query ME {
    me {
      id
      username
      avatar
    }
  }
`

export const FEED = gql`
  query seeFeed{
    seeFeed {
      id
      file
      caption
      createdAt
      likes
      commentsNumber
      comments {
        id
        payload
        isMine
        createdAt
        user {
          username
          avatar
        }
      }
      isLikedByMe
      user {
        username
        isMe
        avatar
      }
    }
  }   
`

export const TOGGLE_LIKE = gql`
  mutation TOGGLE_LIKE($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`

export const ADD_COMMENT = gql`
  mutation CreateComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
      commentId
    }
  }
`

export const SEE_PIC = gql`
  query Query($seePhotoId: Int!) {
    seePhoto(id: $seePhotoId) {
      id
      user {
        username
        avatar
      }
      caption
      file
      hashtags {
        id
        hashtag
      }
      likes
      isLikedByMe
      comments {
        id
        payload
        user {
          username
          avatar
        }
      }
      createdAt
      commentsNumber
    }
  }
`