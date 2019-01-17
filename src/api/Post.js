import gql from 'graphql-tag'

export const getLatestPosts = gql`
query getLatestPosts($type: String, $userId: String, $albumId: String, $tagId: String, $festId: String, $duration: String, $withImage: Boolean, $personal: Boolean, $keyword: String, $skip: Int, $limit: Int) {
  posts(type: $type, userId: $userId, albumId: $albumId, tagId: $tagId, festId: $festId, duration: $duration, withImage: $withImage, personal: $personal, keyword: $keyword, skip: $skip, limit: $limit) {
    _id
    createdAt
    postedAt
    title
    slug
    excerpt
    coverImg
    videoLink
    isAdultContent
    paymentType
    coins
    isBought
    isPromoted
    isFromRyfmaBlog
    promo {
      currentViews
    }
    author {
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
      }
    }
  }
}
`

export const getPostData = gql`
  query getPostData($postId: ID!) {
    getPost(postId: $postId) {
      _id
      postedAt
      title
      slug
      htmlBody
      excerpt
      paymentType
      coins
      viewCount
      lastCommentedAt
      clickCount
      status
      sticky
      userId
      coverImg
      videoLink
      videoId
      tags {
        _id
        name
      }
      fests
      albumId
      isCertified
      isAdultContent
      isFromRyfmaBlog
    }
  }
`

export const getPostInfo = gql`
  query getPostInfo($postId: ID!) {
    getPost(postId: $postId) {
      _id
      createdAt
      postedAt
      title
      slug
      excerpt
      htmlBody
      likeCount
      liked
      currUserLikes
      viewCount
      savedCount
      saved
      commentsCount
      userId
      coverImg
      videoLink
      fests
      paymentType
      coins
      isBought
      isCertified
      isAdultContent
      album {
        _id
        title
        slug
      }
      tags {
        _id
        name
        slug
      }
      author {
        _id
        username
        isFollowing
        coins
        roles
        emails {
          verified
        }
        profile {
          name
          image
          twitterUser
        }
      }
    }
  }
`

export const getPromotion = gql`
  query getPromotion {
    getPromotion {
      _id
      totalViews
      currentViews
      post {
        _id
        createdAt
        postedAt
        title
        slug
        excerpt
        coverImg
        videoLink
        author {
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
          }
        }
      }
    }
  }
`

export const likePost = gql`
  mutation likePost(
    $_id: ID!
    $title: String!
    $userId: String!
    $likes: Int!
    $totalLikes: Int!
  ) {
    likePost(
      _id: $_id
      title: $title
      userId: $userId
      likes: $likes
      totalLikes: $totalLikes
    )
  }
`

export const unSavePost = gql`
  mutation unSavePost($_id: ID!, $userId: String!) {
    unSavePost(_id: $_id, userId: $userId)
  }
`

export const savePost = gql`
  mutation savePost($_id: ID!, $title: String!, $userId: String!) {
    savePost(_id: $_id, title: $title, userId: $userId)
  }
`

export const increasePostViewCount = gql`
  mutation increasePostViewCount($_id: ID!) {
    increasePostViewCount(_id: $_id)
  }
`

export const allowAdultContent = gql`
  mutation allowAdultContent {
    allowAdultContent
  }
`

export const followUser = gql`
  mutation followUser($_id: ID!) {
    followUser(
      _id: $_id
    )
  }
`

export const getRelatedPosts = gql`
  query getRelatedPosts($postId: ID!, $tags: [String]) {
    relatedPosts(postId: $postId, tags: $tags) {
      _id
      createdAt
      postedAt
      title
      coverImg
      slug
      excerpt
      tags {
        _id
        name
        slug
      }
      author {
        _id
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

export const getPostLikers = gql`
  query getPostLikers($postId: ID!, $festId: String, $skip: Int, $limit: Int) {
    getPostLikers(postId: $postId, festId: $festId, skip: $skip, limit: $limit)
  }
`

export const insertPost = gql`
  mutation insertPost(
    $title: String!,
    $slug: String!,
    $htmlBody:  String!,
    $excerpt: String!,
    $paymentType: Int,
    $coins: Int,
    $status: String!,
    $sticky: Boolean,
    $coverImg: String,
    $videoLink: String,
    $tags: [String]!,
    $albumId: String,
    $isFromRyfmaBlog: Boolean
    $isCertified: Boolean
    $isAdultContent: Boolean
  ) {
    insertPost(
      title: $title,
      slug: $slug,
      htmlBody: $htmlBody,
      paymentType: $paymentType,
      coins: $coins,
      excerpt: $excerpt,
      status: $status,
      sticky: $sticky,
      coverImg: $coverImg,
      videoLink: $videoLink,
      tags: $tags,
      albumId: $albumId,
      isFromRyfmaBlog: $isFromRyfmaBlog,
      isCertified: $isCertified,
      isAdultContent: $isAdultContent
    ){
      _id
    }
  }
`

export const deletePost = gql`
  mutation deletePost($_id: ID!) {
    deletePost(
      _id: $_id
    )
  }
`

export const updatePost = gql`
  mutation updatePost(
    $_id: ID!,
    $title: String!,
    $slug: String!,
    $htmlBody:  String!,
    $excerpt: String!,
    $paymentType: Int,
    $coins: Int,
    $status: String!,
    $sticky: Boolean,
    $coverImg: String,
    $videoLink: String,
    $tags: [String]!,
    $albumId: String,
    $oldAlbumId: String,
    $isFromRyfmaBlog: Boolean
    $isAdultContent: Boolean
    $isCertified: Boolean
  ) {
    updatePost(
      _id: $_id,
      title: $title,
      slug: $slug,
      htmlBody: $htmlBody,
      excerpt: $excerpt,
      paymentType: $paymentType,
      coins: $coins,
      status: $status,
      sticky: $sticky,
      coverImg: $coverImg,
      videoLink: $videoLink,
      tags: $tags,
      albumId: $albumId,
      oldAlbumId: $oldAlbumId,
      isFromRyfmaBlog: $isFromRyfmaBlog,
      isCertified: $isCertified,
      isAdultContent: $isAdultContent
    )
  }
`
