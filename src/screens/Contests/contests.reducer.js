import {
  GET_CONTESTS,
  GET_CONTEST_INFO
} from './contests.type'

const initialState = {
  contest: {},
  contests: [],
  isPendingContest: false,
  isPendingContests: false,
  error: ''
}

const contestsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_CONTESTS.PENDING:
      return {
        ...state,
        contest: [],
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
        contest: {},
        error: '',
        isPendingContest: true
      }
    case GET_CONTEST_INFO.SUCCESS:
      return {
        ...state,
        contest: action.payload,
        error: '',
        isPendingContest: false
      }
    case GET_CONTEST_INFO.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingContest: false
      }

    default:
      return state
  }
}

export default contestsReducer
