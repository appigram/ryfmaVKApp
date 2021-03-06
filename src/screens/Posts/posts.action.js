import { client } from '../../ApolloClient'
import { getLatestPosts, getPostInfo } from '../../api/Post'

import {
  GET_POSTS,
  GET_POSTS_CONTENTS
} from './posts.type'

export const getPosts = ({type, userId, albumId, tagId, festId, withImage, duration, personal, keyword, skip, limit, force, replaceFeed}) => {
  return (dispatch, getState) => {
    console.log('New action!')
    console.log('replaceFeed: ', replaceFeed)
    dispatch({ type: GET_POSTS.PENDING, replaceFeed })

    return client.query({
      query: getLatestPosts,
      variables: {
        type,
        userId,
        albumId,
        tagId,
        festId,
        withImage,
        duration,
        personal,
        keyword,
        skip,
        limit
      },
      fetchPolicy: force ? 'network-only' : 'cache-first'
    })
    .then(data => {
      dispatch({
        type: GET_POSTS.SUCCESS,
        payload: data.data.posts,
        replaceFeed,
        error: ''
      })
    })
    .catch(error => {
      dispatch({
        type: GET_POSTS.ERROR,
        payload: error.message
      })
    })
  }
}

export const getPostContents = ({postId}) => {
  return (dispatch, getState) => {
    dispatch({ type: GET_POSTS_CONTENTS.PENDING })

    return client.query({
      skip: !postId,
      query: getPostInfo,
      variables: {
        postId: postId
      }
    })
    .then(data => {
      dispatch({
        type: GET_POSTS_CONTENTS.SUCCESS,
        payload: data.data.getPost
      })
    })
    .catch(error => {
      dispatch({
        type: GET_POSTS_CONTENTS.ERROR,
        payload: error.message
      })
    })
  }
}
