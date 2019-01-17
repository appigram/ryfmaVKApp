import { client } from '../../ApolloClient'
import { getLatestPosts } from '../../api/Post'
import { getFollowers, getFollowing, getUser, followUser, unFollowUser, getPaidUsersFull } from '../../api/User'

import {
  GET_USER_INFO,
  GET_USER_POSTS,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  GET_PAID_USERS,
  FOLLOW,
  UNFOLLOW
} from './users.type'

export const getUserInfo = ({username, force}) => {
  return (dispatch, getState) => {
    dispatch({ type: GET_USER_INFO.PENDING })

    return client.query({
      skip: !username,
      query: getUser,
      variables: {
        username: username
      },
      fetchPolicy: force ? 'network-only' : 'cache-first'
    })
    .then(data => {
      dispatch({
        type: GET_USER_INFO.SUCCESS,
        payload: data.data.getUser,
        error: ''
      })
    })
    .catch(error => {
      dispatch({
        type: GET_USER_INFO.ERROR,
        payload: error.message
      })
    })
  }
}

export const getUserPosts = ({type, subtype, userId, tagId, duration}) => {
  return (dispatch, getState) => {
    dispatch({ type: GET_USER_POSTS.PENDING })

    return client.query({
      query: getLatestPosts,
      variables: {
        type: type,
        subtype: subtype,
        userId: userId,
        tagId: tagId,
        duration: duration,
        limit: 10
      }
    })
    .then(data => {
      dispatch({
        type: GET_USER_POSTS.SUCCESS,
        payload: data.data.posts,
        error: ''
      })
    })
    .catch(error => {
      dispatch({
        type: GET_USER_POSTS.ERROR,
        payload: error.message
      })
    })
  }
}

export const getUserFollowers = ({username}) => {
  return (dispatch, getState) => {
    dispatch({ type: GET_FOLLOWERS.PENDING })

    return client.query({
      skip: !username,
      query: getFollowers,
      variables: {
        username: username,
        skip: 0,
        limit: 15
      }
    })
    .then(data => {
      dispatch({
        type: GET_FOLLOWERS.SUCCESS,
        payload: data.data.getFollowers
      })
    })
    .catch(error => {
      dispatch({
        type: GET_FOLLOWERS.ERROR,
        payload: error.message
      })
    })
  }
}

export const getUserFollowing = ({username}) => {
  return (dispatch, getState) => {
    dispatch({ type: GET_FOLLOWING.PENDING })

    return client.query({
      skip: !username,
      query: getFollowing,
      variables: {
        username: username,
        skip: 0,
        limit: 15
      }
    })
    .then(data => {
      dispatch({
        type: GET_FOLLOWING.SUCCESS,
        payload: data.data.getFollowing
      })
    })
    .catch(error => {
      dispatch({
        type: GET_FOLLOWING.ERROR,
        payload: error.message
      })
    })
  }
}

export const getPaidUsers = ({duration, skip, limit}) => {
  return (dispatch, getState) => {
    dispatch({ type: GET_PAID_USERS.PENDING })

    return client.query({
      query: getPaidUsersFull,
      variables: {
        duration,
        skip,
        limit
      }
    })
    .then(data => {
      dispatch({
        type: GET_PAID_USERS.SUCCESS,
        payload: data.data.getPaidUsersFull
      })
    })
    .catch(error => {
      dispatch({
        type: GET_PAID_USERS.ERROR,
        payload: error.message
      })
    })
  }
}

export const follow = ({_id}) => {
  return (dispatch, getState) => {
    dispatch({ type: FOLLOW.PENDING })

    return client.mutate({
      skip: !_id,
      mutation: followUser,
      variables: {
        _id: _id
      }
    })
    .then(data => {
      console.log(data)
      /* dispatch({
        type: FOLLOW.SUCCESS,
        payload: data.data.followUser,
      }) */
    })
    .catch(error => {
      console.log(error)
      /* dispatch({
        type: FOLLOW.ERROR,
        payload: error.message,
      }) */
    })
  }
}

export const unfollow = ({_id}) => {
  return (dispatch, getState) => {
    dispatch({ type: UNFOLLOW.PENDING })

    return client.mutate({
      skip: !_id,
      mutation: unFollowUser,
      variables: {
        _id: _id
      }
    })
    .then(data => {
      console.log(data)
      /* dispatch({
        type: UNFOLLOW.SUCCESS,
        payload: data.data.followUser,
      }) */
    })
    .catch(error => {
      console.log(error)
      /* dispatch({
        type: UNFOLLOW.ERROR,
        payload: error.message,
      }) */
    })
  }
}
