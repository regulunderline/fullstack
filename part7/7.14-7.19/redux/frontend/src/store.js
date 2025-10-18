import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loggedInUserReducer from './reducers/loggedInUserReducer'
import usersReducer from './reducers/usersReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    loggedInUser: loggedInUserReducer,
    notification: notificationReducer,
    users: usersReducer,
    user: userReducer
  }
})

export default store