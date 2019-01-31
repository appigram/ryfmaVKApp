import { client } from '../../ApolloClient'
import { getComments, insertComment, updateComment, deleteComment } from '../../api/Comment'

import {
  GET_COMMENTS,
  CREATE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT
} from './comments.type'

export const getCommentsFunc = ({objectId, parentId, festId, skip, limit}) => {
  return (dispatch, getState) => {
    dispatch({ type: GET_COMMENTS.PENDING })

    return client.query({
      query: getComments,
      variables: {
        objectId, parentId, festId, skip, limit
      }
    })
    .then(data => {
      dispatch({
        type: GET_COMMENTS.SUCCESS,
        payload: data.data.getComments,
        error: ''
      })
    })
    .catch(error => {
      dispatch({
        type: GET_COMMENTS.ERROR,
        payload: error.message
      })
    })
  }
}

export const insertCommentFunc = ({
  content,
  objectType,
  objectId,
  parentId,
  title,
  userId,
  ratingCount,
  currRating,
  newRating
}) => {
  return (dispatch, getState) => {
    dispatch({ type: CREATE_COMMENT.PENDING })

    return client.query({
      query: insertComment,
      variables: {
        content,
        objectType,
        objectId,
        parentId,
        title,
        userId,
        ratingCount,
        currRating,
        newRating
      }
    })
    .then(data => {
      dispatch({
        type: CREATE_COMMENT.SUCCESS,
        payload: data.data.getFollowers
      })
    })
    .catch(error => {
      dispatch({
        type: CREATE_COMMENT.ERROR,
        payload: error.message
      })
    })
  }
}

export const updateCommentFunc = ({
  _id,
  content,
  objectType,
  objectId,
  parentId
}) => {
  return (dispatch, getState) => {
    dispatch({ type: UPDATE_COMMENT.PENDING })

    return client.query({
      query: updateComment,
      variables: {
        _id,
        content,
        objectType,
        objectId,
        parentId
      }
    })
    .then(data => {
      dispatch({
        type: UPDATE_COMMENT.SUCCESS,
        payload: data.data.updateComment
      })
    })
    .catch(error => {
      dispatch({
        type: UPDATE_COMMENT.ERROR,
        payload: error.message
      })
    })
  }
}

export const deleteCommentFunc = ({
  _id,
  userId,
  objectType,
  objectId,
  parentId
}) => {
  return (dispatch, getState) => {
    dispatch({ type: DELETE_COMMENT.PENDING })

    return client.query({
      query: deleteComment,
      variables: {
        _id,
        userId,
        objectType,
        objectId,
        parentId
      }
    })
    .then(data => {
      dispatch({
        type: DELETE_COMMENT.SUCCESS,
        payload: data.data.deleteComment
      })
    })
    .catch(error => {
      dispatch({
        type: DELETE_COMMENT.ERROR,
        payload: error.message
      })
    })
  }
}
