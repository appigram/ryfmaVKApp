import gql from 'graphql-tag'

export const getLatestMessages = gql`
  query getMessages($roomId: String, $skip: Int, $limit: Int) {
    messages(roomId: $roomId, skip: $skip, limit: $limit) {
      _id
      roomId
      userId
      createdAt
      content
      unreadStatus
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

export const createNewMessage = gql`
  mutation createMessage(
    $roomId: String!,
    $content: String!,
    $userId: String!
    $attachImg: String,
  ) {
    createMessage(
      content: $content,
      userId: $userId,
      roomId: $roomId,
      attachImg: $attachImg,
    ){
      _id
      roomId
      createdAt
      content
      userId
    }
  }
`
