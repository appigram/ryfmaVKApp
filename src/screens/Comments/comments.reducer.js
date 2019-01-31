import {
  GET_COMMENTS,
  CREATE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT
} from './comments.type'

const initialState = {
  comments: [],
  isPendingComments: false,
  error: ''
}

const commentsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_COMMENTS.PENDING:
      return {
        ...state,
        comments: [],
        error: '',
        isPendingComments: true
      }
    case GET_COMMENTS.SUCCESS:
      return {
        ...state,
        comments: [...action.payload, ...state.comments],
        error: '',
        isPendingComments: false
      }
    case GET_COMMENTS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingComments: false
      }
    case CREATE_COMMENT.PENDING:
      return {
        ...state,
        error: ''
      }
    case CREATE_COMMENT.SUCCESS:
      return {
        ...state,
        comments: [...action.payload, ...state.comments],
        error: ''
      }
    case CREATE_COMMENT.ERROR:
      return {
        ...state,
        error: action.payload
      }
    case UPDATE_COMMENT.PENDING:
      return {
        ...state,
        error: ''
      }
    case UPDATE_COMMENT.SUCCESS:
      return {
        ...state,
        comments: action.payload,
        error: ''
      }
    case UPDATE_COMMENT.ERROR:
      return {
        ...state,
        error: action.payload
      }
    case DELETE_COMMENT.PENDING:
      return {
        ...state,
        error: ''
      }
    case DELETE_COMMENT.SUCCESS:
      return {
        ...state,
        comments: action.payload,
        error: ''
      }
    case DELETE_COMMENT.ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export default commentsReducer
