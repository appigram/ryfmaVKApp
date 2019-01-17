import { client } from '../../ApolloClient'
import { searchPostsFull, searchUsersFull, searchTagsFull } from '../../api/Search'
import { getLatestPosts } from '../../api/Post'
import { getPaidUsersFull } from '../../api/User'

import {
  SEARCH_POSTS,
  SEARCH_USERS,
  SEARCH_TAGS
} from './search.type'

export const searchTags = ({keyword}) => {
  return (dispatch, getState) => {
    dispatch({ type: SEARCH_TAGS.PENDING })
    console.log('searchTags: ', keyword)
    return client.query({
      query: searchTagsFull,
      variables: {
        keyword: keyword,
        limit: 10
      }
    })
    .then(data => {
      dispatch({
        type: SEARCH_TAGS.SUCCESS,
        payload: data.data.searchTags,
        keyword: keyword,
        error: ''
      })
    })
    .catch(error => {
      dispatch({
        type: SEARCH_TAGS.ERROR,
        payload: error.message
      })
    })
  }
}

export const searchPosts = ({ keyword, skip, limit }) => {
  return (dispatch, getState) => {
    dispatch({ type: SEARCH_POSTS.PENDING })
    console.log('searchPosts: ', keyword)

    return client.query({
      query: searchPostsFull,
      variables: {
        keyword,
        skip,
        limit
      }
    })
    .then(data => {
      dispatch({
        type: SEARCH_POSTS.SUCCESS,
        payload: data.data.searchPosts,
        keyword,
        error: ''
      })
    })
    .catch(error => {
      dispatch({
        type: SEARCH_POSTS.ERROR,
        payload: error.message
      })
    })
  }
}

export const searchPostsByTag = ({tagId}) => {
  return (dispatch, getState) => {
    dispatch({ type: SEARCH_POSTS.PENDING })

    return client.query({
      query: getLatestPosts,
      variables: {
        type: 'latest',
        tagId: tagId,
        limit: 10
      }
    })
    .then(data => {
      dispatch({
        type: SEARCH_POSTS.SUCCESS,
        payload: data.data.posts,
        error: ''
      })
    })
    .catch(error => {
      dispatch({
        type: SEARCH_POSTS.ERROR,
        payload: error.message
      })
    })
  }
}

export const searchUsers = ({ keyword, skip, limit }) => {
  return (dispatch, getState) => {
    dispatch({ type: SEARCH_USERS.PENDING })
    console.log('searchUsers: ', keyword)

    return client.query({
      query: searchUsersFull,
      variables: {
        keyword,
        skip,
        limit
      }
    })
    .then(data => {
      dispatch({
        type: SEARCH_USERS.SUCCESS,
        payload: data.data.searchUsers,
        keyword,
        error: ''
      })
    })
    .catch(error => {
      dispatch({
        type: SEARCH_USERS.ERROR,
        payload: error.message
      })
    })
  }
}
