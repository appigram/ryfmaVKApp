import gql from 'graphql-tag'

export const createRoom = gql`
  mutation createRoom(
    $type: Int!,
    $creatorId: String!,
    $name: String,
    $users: [String]!,
    $roomIcon: String
  ) {
    createRoom(
      name: $name,
      type: $type,
      creatorId: $creatorId,
      users: $users,
      roomIcon: $roomIcon
    ){
      _id
    }
  }
`

export const deleteRoom = gql`
  mutation deleteRoom($roomId: ID!, $usersIds: [String!]) {
    deleteRoom(
      roomId: $roomId,
      usersIds: $usersIds
    ) {
      _id
    }
  }
`

export const getRooms = gql`
  query getRooms($type: String, $skip: Int, $limit: Int) {
    rooms(type: $type, skip: $skip, limit: $limit) {
      _id
      name
      type
      userCount
      lastRead
      lastDateAt
      unreadCount
      roomIcon
      roomUsers {
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

export const roomUsers = gql`
  query roomUsers($keyword: String!, $limit: Int) {
    roomUsers(keyword: $keyword, limit: $limit) {
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
