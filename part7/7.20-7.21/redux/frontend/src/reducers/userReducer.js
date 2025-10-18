import { createSlice, current } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export const initializeUser = ({ id }) => {
  return async dispatch => {
    const user = await userService.getOne(id)
    dispatch(setUser(user))
  }
}

export default userSlice.reducer