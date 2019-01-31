import {
  GET_USER_INFO,
  GET_USER_POSTS,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  GET_PAID_USERS
} from './users.type'

const initialState = {
  user: null,
  posts: [],
  followers: [],
  following: [],
  paidUsers: [],
  isPendingUser: false,
  isPendingPosts: false,
  isPendingFollowers: false,
  isPendingFollowing: false,
  isPendingPaidUsers: false,
  error: ''
}

const usersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_USER_INFO.PENDING:
      return {
        ...state,
        user: {},
        error: '',
        isPendingUser: true
      }
    case GET_USER_INFO.SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: '',
        isPendingUser: false
      }
    case GET_USER_INFO.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingUser: false
      }
    case GET_USER_POSTS.PENDING:
      return {
        ...state,
        posts: [],
        error: '',
        isPendingPosts: true
      }
    case GET_USER_POSTS.SUCCESS:
      return {
        ...state,
        posts: action.payload,
        error: '',
        isPendingPosts: false
      }
    case GET_USER_POSTS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingPosts: false
      }
    case GET_FOLLOWERS.PENDING:
      return {
        ...state,
        error: '',
        isPendingFollowers: true
      }
    case GET_FOLLOWERS.SUCCESS:
      return {
        ...state,
        followers: action.payload,
        error: '',
        isPendingFollowers: false
      }
    case GET_FOLLOWERS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingFollowers: false
      }
    case GET_FOLLOWING.PENDING:
      return {
        ...state,
        error: '',
        isPendingFollowing: true
      }
    case GET_FOLLOWING.SUCCESS:
      return {
        ...state,
        following: action.payload,
        error: '',
        isPendingFollowing: false
      }
    case GET_FOLLOWING.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingFollowing: false
      }
    case GET_PAID_USERS.PENDING:
      return {
        ...state,
        error: '',
        isPendingPaidUsers: true
      }
    case GET_PAID_USERS.SUCCESS:
      return {
        ...state,
        paidUsers: action.payload,
        error: '',
        isPendingPaidUsers: false
      }
    case GET_PAID_USERS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingPaidUsers: false
      }
    default:
      return state
  }
}

export default usersReducer
