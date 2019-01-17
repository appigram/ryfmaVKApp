import gql from 'graphql-tag'

export const getLatestNotificatons = gql`
  query getLatestNotificatons {
    notifications {
      _id
      createdAt
      currId
      userId
      author {
        _id
        username
        profile {
          name
          image
        }
      }
      post {
        coverImg
      }
      text
      notifType
      objectId
      objectName
    }
  }
`
