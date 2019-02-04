import {
  GET_POPULAR_TAGS,
  CREATE_TAG,
  DELETE_TAG
} from './tags.type'

const initialState = {
  popularTags: [],
  isPendingPopularTags: false,
  error: ''
}

const popularTagsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_POPULAR_TAGS.PENDING:
      return {
        ...state,
        popularTags: [],
        error: '',
        isPendingPopularTags: true
      }
    case GET_POPULAR_TAGS.SUCCESS:
      return {
        ...state,
        popularTags: [...action.payload, ...state.popularTags],
        error: '',
        isPendingPopularTags: false
      }
    case GET_POPULAR_TAGS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingPopularTags: false
      }
    case CREATE_TAG.PENDING:
      return {
        ...state,
        error: ''
      }
    case CREATE_TAG.SUCCESS:
      return {
        ...state,
        popularTags: [...action.payload, ...state.popularTags],
        error: ''
      }
    case CREATE_TAG.ERROR:
      return {
        ...state,
        error: action.payload
      }
    case DELETE_TAG.PENDING:
      return {
        ...state,
        error: ''
      }
    case DELETE_TAG.SUCCESS:
      return {
        ...state,
        popularTags: action.payload,
        error: ''
      }
    case DELETE_TAG.ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export default popularTagsReducer
