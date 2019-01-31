import gql from 'graphql-tag'

export const getFestivals = gql`
  query getFestivals(
    $keyword: String,
    $genreType: String,
    $sortType: String,
    $location: String,
    $skip: Int,
    $limit: Int
    $isDuel: Boolean
  ) {
    getFestivals(
      keyword: $keyword,
      genreType: $genreType,
      sortType: $sortType,
      location: $location,
      skip: $skip,
      limit: $limit,
      isDuel: $isDuel
    ) {
      _id
      title
      slug
      brief
      description
      fromDate
      toDate
      sticky
      coverImg
      genres
      entryFee
      topPrize
      extraPrize
      countries
      author {
        _id
        username
        profile {
          name
          image
        }
      }
      usersData {
        _id
        username
        profile {
          image
        }
      }
      stats {
        usersCount
      }
    }
  }
`

export const getContest = gql`
  query getContest($slug: String, $festId: String) {
    getContest(slug: $slug, festId: $festId) {
      _id
      ownerId
      seoTitle
      title
      slug
      brief
      description
      fromDate
      toDate
      acceptDate
      sticky
      coverImg
      genres
      entryFee
      vkGroupLink
      vkEventLink
      fbGroupLink
      topPrize
      extraPrize
      noJury
      isFestival
      isDuel
      countries
      levels
      currentLevel
      author {
        _id
        username
        roles
        profile {
          name
          image
        }
      }
      usersData {
        _id
        username
        roles
        profile {
          image
          name
        }
      }
      cities {
        name
        coordinates
        partners {
          name
          brief
          logoLink
          url
          images
        }
      }
      curatorsData {
        _id
        username
        profile {
          name
          image
          city
          vkUser
        }        
      }
      juryData {
        _id
        username
        roles
        profile {
          name
          image
        }
      }
      partners {
        name
        brief
        logoLink
        url
        images
      }
      stats {
        juryCount
        countryCount
        citiesCount
        usersCount
      }
      comments {
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
  }
`

export const getFestPosts = gql`
  query getFestPosts($festId: String!, $keyword: String, $city: String, $filterType: String, $sortType: String, $level: Int, $skip: Int, $limit: Int) {
    festPosts(festId: $festId, keyword: $keyword, city: $city, filterType: $filterType, sortType: $sortType, level: $level, skip: $skip, limit: $limit) {
      _id
      festId
      postId
      userId
      city
      likeCount

      author {
        _id
        username
        roles
        profile {
          name
          image
        }
      }

      post {
        _id
        createdAt
        title
        slug
        excerpt
        htmlBody
        coverImg
        likeCount
        liked
        currUserLikes
        commentsCount
        userId
        isAdultContent
      }

      juryStats {
        userId
        rating
      }

      stats {
        juryCount
        juryAverage
        juryTotal
      }
    }
  }
`
