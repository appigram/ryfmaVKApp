import {
  SEARCH_POSTS,
  SEARCH_USERS,
  SEARCH_TAGS
} from './search.type'

const initialState = {
  posts: [],
  users: [],
  tags: [],
  isPendingPosts: false,
  isPendingUsers: false,
  isPendingTags: false,
  keyword: '',
  error: ''
}

const searchReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SEARCH_POSTS.PENDING:
      return {
        ...state,
        posts: [],
        error: '',
        isPendingPosts: true
      }
    case SEARCH_POSTS.SUCCESS:
      return {
        ...state,
        posts: action.payload,
        keyword: action.keyword,
        error: '',
        isPendingPosts: false
      }
    case SEARCH_POSTS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingPosts: false
      }
    case SEARCH_USERS.PENDING:
      return {
        ...state,
        error: '',
        isPendingUsers: true
      }
    case SEARCH_USERS.SUCCESS:
      return {
        ...state,
        users: action.payload,
        keyword: action.keyword,
        error: '',
        isPendingUsers: false
      }
    case SEARCH_USERS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingUsers: false
      }
    case SEARCH_TAGS.PENDING:
      return {
        ...state,
        error: '',
        isPendingTags: true
      }
    case SEARCH_TAGS.SUCCESS:
      return {
        ...state,
        tags: action.payload,
        keyword: action.keyword,
        error: '',
        isPendingTags: false
      }
    case SEARCH_TAGS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingTags: false
      }
    default:
      return state
  }
}

export default searchReducer
