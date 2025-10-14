import { createSlice, current } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    newNotification(state, action) {
      return action.payload
    }
  }
})

export const { newNotification } = notificationSlice.actions

export const setNotification = (message, type, timeout) => {
  return async dispatch => {
    console.log(message, type)
    dispatch(newNotification({ message, type }))
    setTimeout(() => dispatch(newNotification(null)), timeout*1000)
  }
}

export default notificationSlice.reducer