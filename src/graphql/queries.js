

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
      totalFollowing
    }
  }
`

export const FEED = gql`
  query seeFeed($cursor: Int){
    seeFeed(cursor: $cursor) {
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
        id
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

export const DELETE_COMMENT = gql`
  mutation DeleteComment($deleteCommentId: Int!) {
    deleteComment(id: $deleteCommentId) {
      ok
      id
      error
    }
  }
`

export const DELETE_PHOTO = gql`
  mutation DeletePhoto($deletePhotoId: Int!) {
    deletePhoto(id: $deletePhotoId) {
      ok
      error
    }
  }
`

export const SEE_PROFILE = gql`
  query SeeProfile($username: String!, $take: Int) {
    seeProfile(username: $username, take: $take) {
      id
      fullName
      username
      bio
      avatar

      photos {
        id
        file
        caption
        hashtags {
          hashtag
          id
        }
        commentsNumber
        comments {
          id
          payload
          user {
            id
            username
            avatar
          }
        }
        likes
        isMine
        isLikedByMe
        createdAt
        user {
          id
          username
          avatar
        }
      }

      isMe
      totalFollowing
      totalFollowers
      totalPics
      isFollowing
    }
  }

`

export const FOLLOW_USER = gql`
  mutation FollowUser($username: String!) {
    followUser(username: $username) {
      ok
      error
      userFollowId
    }
  }
`

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
      error
      userFollowId
    }
  }
`

export const SEARCH_BY_HASHTAG = gql`
  query Query($hashtag: String!) {
    searchPhotosByHashtag(hashtag: $hashtag) {
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
        id
        username
        isMe
        avatar
      }
    }
  }
`

export const SEARCH_PHOTOS = gql`
  query SearchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
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
        id
        username
        isMe
        avatar
      }
    }
  }
`

export const SHOW_ALL_USERS = gql`
  query ShowAllUsers($limit: Int) {
    showAllUsers(limit: $limit) {
      username
      id
      avatar
      isFollowing
      
    }
  }
`

export const UPLOAD_PIC = gql`
  mutation UploadPhoto($file: Upload!) {
    uploadPhoto(file: $file) {
      ok
      error
      photoUrl
    }
  }
`

export const EDIT_AVATAR = gql`
  mutation EditAvatar($avatar: Upload!) {
    editProfile(avatar: $avatar) {
      ok
      error
    }
  }
`

export const EDIT_CAPTION = gql`
  mutation Mutation($editPhotoId: Int!, $caption: String!) {
    editPhoto(id: $editPhotoId, caption: $caption) {
      ok
      error
    }
  }
`

export const DELETE_ACCOUNT = gql`
  mutation DelAccount($id: Int!) {
    deleteAccount(id:$id) {
      ok
      error
    }
  }
`