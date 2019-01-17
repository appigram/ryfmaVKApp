import gql from 'graphql-tag'

export const getLatestAlbums = gql`
  query getLatestAlbums($type: String!, $userId: String) {
    albums(type: $type, userId: $userId) {
      _id
      title
      description
      postCount
      userId
    }
  }
`

export const getLatestAlbumsFull = gql`
  query getLatestAlbums($type: String!, $userId: String) {
    albums(type: $type, userId: $userId) {
      _id
      createdAt
      updatedAt
      title
      slug
      description
      viewCount
      postCount
      status
      sticky
      userId
      coverImg
    }
  }
`

export const getAlbumInfo = gql`
  query getAlbumInfo($albumId: ID!) {
    album(albumId: $albumId) {
      _id
      createdAt
      updatedAt
      title
      description
      viewCount
      postCount
      status
      sticky
      userId
      coverImg
    }
  }
`

export const getAlbumInfoFull = gql`
  query getAlbumInfo($albumId: ID!) {
    album(albumId: $albumId) {
      _id
      createdAt
      updatedAt
      title
      description
      viewCount
      postCount
      status
      sticky
      userId
      coverImg
      author {
        _id
        username
        isFollowing
        roles
        profile {
          name
          image
        }
      }
    }
  }
`

export const createNewAlbum = gql`
  mutation createNewAlbum(
    $title: String!,
    $slug: String!,
    $description:  String!,
    $status: String!,
    $sticky: Boolean,
    $coverImg: String,
  ) {
    createNewAlbum(
      title: $title,
      slug: $slug,
      description: $description,
      status: $status,
      sticky: $sticky,
      coverImg: $coverImg,
    ){
      _id
    }
  }
`

export const updateAlbum = gql`
  mutation updateAlbum(
    $_id: ID!,
    $title: String!,
    $slug: String!,
    $description:  String!,
    $status: String!,
    $sticky: Boolean,
    $coverImg: String,
  ) {
    updateAlbum(
      _id: $_id,
      title: $title,
      slug: $slug,
      description: $description,
      status: $status,
      sticky: $sticky,
      coverImg: $coverImg,
    )
  }
`

export const deleteAlbum = gql`
  mutation deleteAlbum($_id: ID!) {
    deleteAlbum(
      _id: $_id
    )
  }
`

export const increaseAlbumViewCount = gql`
  mutation increaseAlbumViewCount($_id: ID!) {
    increaseAlbumViewCount(
      _id: $_id
    )
  }
`
