import gql from 'graphql-tag'

export const getComments = gql`
  query getComments($objectId: String!, $parentId: String, $festId: String,  $skip: Int, $limit: Int) {
    getComments(objectId: $objectId, parentId: $parentId, festId: $festId,  skip: $skip, limit: $limit) {
      _id
      createdAt
      postedAt
      content
      slug
      objectType
      objectId
      parentId
      userId
      spamScore
      author {
        _id
        username
        roles
        emails {
          verified
        }
        profile {
          name
          image
        }
      }
    }
  }
`

export const insertComment = gql`
  mutation insertComment(
    $content: String!,
    $objectType: String!,
    $objectId: String!,
    $parentId: String,
    $title: String!,
    $userId: String!
    $ratingCount: Int,
    $currRating: Float,
    $newRating: Int,
  ) {
    insertComment(
      content: $content,
      objectType: $objectType,
      objectId: $objectId,
      parentId: $parentId,
      title: $title,
      userId: $userId,
      ratingCount: $ratingCount,
      currRating: $currRating,
      newRating: $newRating,
    ){
      _id
      createdAt
      postedAt
      content
      objectType
      objectId
      parentId
      userId
      author {
        _id
        username
        emails {
          verified
        }
        profile {
          name
          image
        }
      }
    }
  }
`

export const updateComment = gql`
  mutation updateComment(
    $_id: ID!,
    $content: String!,
    $objectType: String!,
    $objectId: String!,
    $parentId: String
  ) {
    updateComment(
      _id: $_id,
      content: $content,
      objectType: $objectType,
      objectId: $objectId,
      parentId: $parentId
    )
  }
`

export const deleteComment = gql`
  mutation deleteComment($_id: ID!, $userId: String!, $objectType: String!, $objectId: String!, $parentId: String) {
    deleteComment(
      _id: $_id,
      userId: $userId,
      objectType: $objectType,
      objectId: $objectId,
      parentId: $parentId
    )
  }
`

export const markCommentAsSpam = gql`
  mutation markCommentAsSpam($_id: ID!, $postUserId: String!, $commentUserId: String!, $spamScore: Int!) {
    markCommentAsSpam(
      _id: $_id,
      postUserId: $postUserId,
      commentUserId: $commentUserId,
      spamScore: $spamScore
    )
  }
`
