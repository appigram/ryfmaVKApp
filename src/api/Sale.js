import gql from 'graphql-tag'

export const buyMoment = gql`
  mutation buyMoment(
    $ownerId: String!
    $sellingId: String!
    $prodId: String!
    $imageUrl: String!
    $price: Int!
  ) {
    buyMoment (
      ownerId: $ownerId,
      sellingId: $sellingId,
      prodId: $prodId,
      imageUrl: $imageUrl
      price: $price
    )
  }
`

export const getSales = gql`
  query getSales($type: String!, $userId: String, $skip: Int, $limit: Int) {
    getSales(type: $type, userId: $userId, skip: $skip, limit: $limit) {
      _id
      createdAt
      ownerId
      userId
      prodId
      imageUrl
      price
      post {
        _id
        title
        slug
        coverImg
      }
      author {
        _id
        username
        profile {
          name
          image
        }
      }
    }
  }
`
