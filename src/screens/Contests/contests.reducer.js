import {
  GET_CONTESTS,
  GET_CONTEST_INFO,
  GET_CONTEST_POSTS
} from './contests.type'

const initialState = {
  contestInfo: null,
  contests: [],
  isPendingContest: false,
  isPendingContests: false,
  isPendingContestPosts: false,
  error: ''
}

const contestsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_CONTESTS.PENDING:
      return {
        ...state,
        contests: [],
        error: '',
        isPendingContests: true
      }
    case GET_CONTESTS.SUCCESS:
      return {
        ...state,
        contests: action.payload,
        error: '',
        isPendingContests: false
      }
    case GET_CONTESTS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingContests: false
      }
    case GET_CONTEST_INFO.PENDING:
      return {
        ...state,
        contestInfo: {},
        error: '',
        isPendingContest: true
      }
    case GET_CONTEST_INFO.SUCCESS:
      console.log('action:', action)

      return {
        ...state,
        contestInfo: action.payload,
        error: '',
        isPendingContest: false
      }
    case GET_CONTEST_INFO.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingContest: false
      }
    case GET_CONTEST_POSTS.PENDING:
      return {
        ...state,
        contestPosts: [],
        error: '',
        isPendingContestPosts: true
      }
    case GET_CONTEST_POSTS.SUCCESS:
      console.log('action:', action)

      return {
        ...state,
        contestPosts: action.payload,
        error: '',
        isPendingContestPosts: false
      }
    case GET_CONTEST_POSTS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingContestPosts: false
      }

    default:
      return state
  }
}

export default contestsReducer
