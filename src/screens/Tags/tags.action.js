import { client } from '../../ApolloClient'
import { getPopularTags, insertTag, deleteTag } from '../../api/Tag'

import {
  GET_POPULAR_TAGS,
  CREATE_TAG,
  DELETE_TAG
} from './tags.type'

export const getPopularTagsFunc = ({ limit }) => {
  return (dispatch, getState) => {
    dispatch({ type: GET_POPULAR_TAGS.PENDING })

    return client.query({
      query: getPopularTags,
      variables: {
        limit
      }
    })
    .then(data => {
      dispatch({
        type: GET_POPULAR_TAGS.SUCCESS,
        payload: data.data.popularTags,
        error: ''
      })
    })
    .catch(error => {
      dispatch({
        type: GET_POPULAR_TAGS.ERROR,
        payload: error.message
      })
    })
  }
}

export const insertTagFunc = ({
  name,
  slug
}) => {
  return (dispatch, getState) => {
    dispatch({ type: CREATE_TAG.PENDING })

    return client.query({
      query: insertTag,
      variables: {
        name,
        slug
      }
    })
    .then(data => {
      dispatch({
        type: CREATE_TAG.SUCCESS,
        payload: data.data.insertTag
      })
    })
    .catch(error => {
      dispatch({
        type: CREATE_TAG.ERROR,
        payload: error.message
      })
    })
  }
}

export const deleteTagFunc = ({
  _id
}) => {
  return (dispatch, getState) => {
    dispatch({ type: DELETE_TAG.PENDING })

    return client.query({
      query: deleteTag,
      variables: {
        _id
      }
    })
    .then(data => {
      dispatch({
        type: DELETE_TAG.SUCCESS,
        payload: data.data.deleteTag
      })
    })
    .catch(error => {
      dispatch({
        type: DELETE_TAG.ERROR,
        payload: error.message
      })
    })
  }
}
