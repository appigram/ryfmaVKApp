import gql from 'graphql-tag'

export const getCurrentUser = gql`
  query getCurrentUser {
    me {
      _id
      username
      roles
      coins
      rooms
      emails {
        address
        verified
      }
      profile {
        name
        firstname
        lastname
        gender
        birthday
        locationStr
        unreadNotifications
        image
        bio
      }
      stats {
        postsCount
        followersCount
        followingCount
        sellingCount
        soldCount
        boughtCount
      }
    }
  }
`

export const getUser = gql`
  query getUser($username: String!) {
    getUser(username: $username) {
      _id
      username
      isFollowing
      roles
      coins
      rooms
      emails {
        verified
      }
      profile {
        name
        firstname
        lastname
        gender
        birthday
        bio
        locationStr
        image
      }
      stats {
        postsCount
        followersCount
        followingCount
      }
    }
  }
`

export const getPaidUsersFull = gql`
  query getPaidUsersFull ($duration: Int, $limit: Int) {
    getPaidUsersFull (duration: $duration, limit: $limit) {
      _id
      username
      roles
      isFollowing
      emails {
        verified
      }
      profile {
        name
        image
        bio
      }
      stats {
        postsCount
        followersCount
      }
    }
  }
`

export const getFollowers = gql`
  query getFollowers($username: String!, $skip: Int, $limit: Int) {
    getFollowers(username: $username, skip: $skip, limit: $limit) {
      _id
      username
      isFollowing
      roles
      coins
      profile {
        name
        bio
        image
      }
    }
  }
`

export const getFollowing = gql`
  query getFollowing($username: String!, $skip: Int, $limit: Int) {
    getFollowing(username: $username, skip: $skip, limit: $limit) {
      _id
      username
      isFollowing
      roles
      coins
      profile {
        name
        bio
        image
      }
    }
  }
`

export const getSavedPosts = gql`
  query getSaved($sortType: String, $userId: String, $albumId: String, $tagId: String) {
    getSaved(sortType: $sortType, userId: $userId, albumId: $albumId, tagId: $tagId) {
      _id
      createdAt
      title
      slug
      excerpt
      coverImg
      author {
        username
        roles
        profile {
          name
          image
        }
      }
    }
  }
`

export const saveProfile = gql`
  mutation saveProfile(
    $firstname: String,
    $lastname: String,
    $gender: String,
    $birthday: String,
    $locationStr: String,
    $bio: String,
  ) {
    saveProfile(
      firstname: $firstname,
      lastname: $lastname,
      gender: $gender,
      birthday: $birthday,
      locationStr: $locationStr,
      bio: $bio,
    )
  }
`

export const saveSettings = gql`
  mutation saveSettings(
    $username: String,
    $email: String,
    $password: String
  ) {
    saveSettings(
      username: $username,
      email: $email,
      password: $password,
    )
  }
`

export const changeUserAvatar = gql`
  mutation changeUserAvatar(
    $avatarUrl: String!,
  ) {
    changeUserAvatar(
      avatarUrl: $avatarUrl,
    )
  }
`

export const followUser = gql`
  mutation followUser($_id: ID!) {
    followUser(
      _id: $_id
    )
  }
`

export const unFollowUser = gql`
  mutation unFollowUser($_id: ID!) {
    unFollowUser(
      _id: $_id
    )
  }
`

export const checkIfUsernameExists = gql`
  mutation checkIfUsernameExists($username: String!) {
    checkIfUsernameExists(
      username: $username
    )
  }
`

export const checkIfEmailExists = gql`
  mutation checkIfEmailExists($email: String!) {
    checkIfEmailExists(
      email: $email
    )
  }
`

export const createDeposit = gql`
  mutation createDeposit($depositType: Int!, $totalSum: Int!, $status: Int!, $comment: String) {
    createDeposit (
      depositType: $depositType,
      totalSum: $totalSum,
      status: $status,
      comment: $comment
    )
  }
`

export const createPayout = gql`
  mutation createPayout($payoutType: Int!, $totalSum: Int!, $status: Int!, $comment: String) {
    createPayout (
      payoutType: $payoutType,
      totalSum: $totalSum,
      status: $status,
      comment: $comment
    )
  }
`
