import gql from 'graphql-tag'

export const insertComment = gql`
  mutation insertComment(
    $content: String!,
    $objectType: String!,
    $objectId: String!,
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
  ) {
    updateComment(
      _id: $_id,
      content: $content,
      objectType: $objectType,
      objectId: $objectId,
    )
  }
`

export const deleteComment = gql`
  mutation deleteComment($_id: ID!, $userId: String!, $objectType: String!, $objectId: String!) {
    deleteComment(
      _id: $_id,
      userId: $userId,
      objectType: $objectType,
      objectId: $objectId
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
