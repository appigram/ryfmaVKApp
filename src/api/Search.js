import gql from 'graphql-tag'

export const searchPosts = gql`
  query searchPosts($keyword: String!) {
    searchPosts(
      keyword: $keyword
    ) {
      _id
      title
      coverImg
    }
  }
`

export const searchPostsFull = gql`
  query searchPosts($keyword: String!, $limit: Int) {
    searchPosts(keyword: $keyword, limit: $limit) {
      _id
      createdAt
      title
      slug
      htmlBody
      excerpt
      viewCount
      lastCommentedAt
      clickCount
      status
      sticky
      userId
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

export const searchUsers = gql`
  query searchUsers($keyword: String!) {
    searchUsers(keyword: $keyword) {
      _id
      username
      profile {
        name
        image
      }
    }
  }
`

export const searchUsersFull = gql`
  query searchUsers($keyword: String!, $limit: Int) {
    searchUsers(keyword: $keyword, limit: $limit) {
      _id
      username
      isFollowing
      roles
      profile {
        name
        bio
        image
      }
    }
  }
`

export const searchTags = gql`
  query searchTags($keyword: String!) {
    searchTags(
      keyword: $keyword
    ) {
      name
    }
  }
`

export const searchTagsFull = gql`
  query searchTags($keyword: String!) {
    searchTags(
      keyword: $keyword
    ) {
      name
      count
    }
  }
`
