import { combineReducers } from 'redux'
// import storage from 'redux-persist/lib/storage'
import postsReducer from './screens/Posts/posts.reducer'
import searchReducer from './screens/Search/search.reducer'
import usersReducer from './screens/Users/users.reducer'
import contestsReducer from './screens/Contests/contests.reducer'
import commentsReducer from './screens/Comments/comments.reducer'

// import { authReducer } from 'auth'
// import { createMomentsReducer } from 'createMoments'
// import { messagesReducer } from 'messages'
// import { molsReducer } from 'mols'
// import { notificationsReducer } from 'notifications'
// import { roomsReducer } from 'rooms'

const appReducer = combineReducers({
  posts: postsReducer,
  search: searchReducer,
  users: usersReducer,
  contests: contestsReducer,
  comments: commentsReducer
  /* app’s top-level reducers */
  // auth: authReducer,
  // createMoments: createMomentsReducer,
  // messages: messagesReducer,
  // mols: molsReducer,
  // notifications: notificationsReducer,
  // rooms: roomsReducer
})

const rootReducer = (state, action) => {
  // console.log('action.type: ', action.type)
  /* if (action.type === 'LOGOUT_PENDING') {
    Object.keys(state).forEach(key => {
      storage.removeItem(`persist:${key}`)
    })
    state = undefined
  } */
  return appReducer(state, action)
}

export default rootReducer
