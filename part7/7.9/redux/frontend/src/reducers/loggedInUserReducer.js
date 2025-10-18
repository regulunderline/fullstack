import { createSlice, current } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "../reducers/notificationReducer";

const loggedInUserSlice = createSlice({
  name: "loggedInUser",
  initialState: null,
  reducers: {
    setLoggedInUser(state, action) {
      return action.payload;
    },
  },
});

export const { setLoggedInUser } = loggedInUserSlice.actions;

export const initializeLoggedInUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setLoggedInUser(user));
      blogService.setToken(user.token);
    }
  };
};

export const deinitializeLoggedInUser = () => {
  return async (dispatch) => {
    dispatch(setLoggedInUser(null));
  };
};

export default loggedInUserSlice.reducer;
