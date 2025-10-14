import { createSlice, current } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const changedBlog = action.payload
      return state
        .map(blog =>
          blog.id !== changedBlog.id ? blog : changedBlog 
        )
        .toSorted((a,b) => b.likes - a.likes)
    },
    setBlogs(state, action) {
      return action.payload.toSorted((a,b) => b.likes - a.likes)
    }
  }
})

export const { updateBlog, setBlogs, appendBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = newBlog => {
  return async dispatch => {
    try {
      const responseBlog = await blogService.create(newBlog)
      dispatch(appendBlog(responseBlog))
      dispatch(setNotification(`created blog '${responseBlog.title}'`, 'success', 5))
    } catch {
      dispatch(setNotification('could not creat a blog', 'error', 5))
    }
  } 
}

export const likeBlog = blog => {
  return async dispatch => {
    try{
      const responseBlog = await blogService.like(blog)
      dispatch(updateBlog(responseBlog))
      dispatch(setNotification(`you liked '${responseBlog.title}'`, 'success', 5))
    } catch {
      dispatch(setNotification('could not like', 'error', 5))
    }
  }
}

export const deleteBlog = blogToDelete => {
  return async dispatch => {
    const resault = await blogService.remove(blogToDelete)
    if (resault){
      dispatch(initializeBlogs())
      dispatch(setNotification(`you removed a blog ${blogToDelete.title} by ${blogToDelete.author}`, 'success', 5))
    } else {
      dispatch(setNotification('could not remove', 'error', 5))
    }
  }
}

export default blogSlice.reducer