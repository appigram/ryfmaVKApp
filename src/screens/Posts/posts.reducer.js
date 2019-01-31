import {
  GET_POSTS,
  GET_POSTS_CONTENTS
} from './posts.type'

const initialState = {
  posts: [],
  postInfo: null,
  isPendingPosts: false,
  isPendingContentsPostInfo: false,
  error: ''
}

const latestPostsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_POSTS.PENDING:
      return {
        ...state,
        posts: action.replaceFeed ? [] : state.posts,
        error: '',
        isPendingPosts: true
      }
    case GET_POSTS.SUCCESS:
      return {
        ...state,
        posts: action.replaceFeed ? action.payload : [...state.posts, ...action.payload],
        error: '',
        isPendingPosts: false
      }
    case GET_POSTS.ERROR:
      return {
        ...state,
        posts: [],
        error: action.payload,
        isPendingPosts: false
      }
    case GET_POSTS_CONTENTS.PENDING:
      return {
        ...state,
        error: '',
        isPendingContentsPostInfo: true
      }
    case GET_POSTS_CONTENTS.SUCCESS:
      return {
        ...state,
        postInfo: action.payload,
        error: '',
        isPendingContentsPostInfo: false
      }
    case GET_POSTS_CONTENTS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingContentsPostInfo: false
      }
    default:
      return state
  }
}

export default latestPostsReducer
