import {
  GET_POSTS,
  GET_POSTS_CONTENTS
} from './posts.type'

const initialState = {
  latestPosts: [],
  bestPosts: [],
  bestDuration: 'day',
  postInfo: {},
  isPendingLatestPosts: false,
  isPendingBestPosts: false,
  isPendingContentsPostInfo: false,
  error: ''
}

const latestPostsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_POSTS.PENDING:
      return {
        ...state,
        latestPosts: state.latestPosts,
        bestPosts: state.bestPosts,
        error: '',
        isPendingLatestPosts: true
      }
    case GET_POSTS.SUCCESS:
      return {
        ...state,
        latestPosts: action.postType === 'latest' ? [...state.latestPosts, ...action.payload] : state.latestPosts,
        bestPosts: action.postType === 'popular' && action.postDuration === state.bestDuration ? [...state.bestPosts, ...action.payload] : action.payload,
        bestDuration: action.postDuration,
        error: '',
        isPendingLatestPosts: false,
        isPendingBestPosts: false
      }
    case GET_POSTS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingLatestPosts: false,
        isPendingBestPosts: false
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
