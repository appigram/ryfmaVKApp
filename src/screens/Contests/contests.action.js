import { client } from '../../ApolloClient'
import { getContest, getFestivals } from '../../api/Contest'

import {
  GET_CONTESTS,
  GET_CONTEST_INFO
} from './contests.type'

export const getContestInfo = ({ slug, festId }) => {
  return (dispatch, getState) => {
    dispatch({ type: GET_CONTEST_INFO.PENDING })

    return client.query({
      query: getContest,
      variables: {
        slug,
        festId
      }
    })
    .then(data => {
      dispatch({
        type: GET_CONTEST_INFO.SUCCESS,
        payload: data.data.getContest,
        error: ''
      })
    })
    .catch(error => {
      dispatch({
        type: GET_CONTEST_INFO.ERROR,
        payload: error.message
      })
    })
  }
}

export const getFestivalsInfo = ({ keyword, genreType, sortType, location, skip, limit, isDuel }) => {
  return (dispatch, getState) => {
    dispatch({ type: GET_CONTESTS.PENDING })

    return client.query({
      query: getFestivals,
      variables: {
        keyword,
        genreType,
        sortType,
        location,
        skip,
        limit,
        isDuel
      }
    })
    .then(data => {
      dispatch({
        type: GET_CONTESTS.SUCCESS,
        payload: data.data.getFestivals,
        error: ''
      })
    })
    .catch(error => {
      dispatch({
        type: GET_CONTESTS.ERROR,
        payload: error.message
      })
    })
  }
}
