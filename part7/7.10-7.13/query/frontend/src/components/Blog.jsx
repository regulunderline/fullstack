import { useState } from 'react'
import Expand from './Expand'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useNotificationDispatch } from '../NotificationContext'

const Blog = ({ blog, user }) => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const [visible, setVisible] = useState(false)

  const likeMutation = useMutation({
      mutationFn: blogService.like, 
      onSuccess: (response) => {
        const blogs = queryClient.getQueryData(['blogs'])
        queryClient.setQueryData(['blogs'], blogs.map(blogFilter => blogFilter.id === response.id ? { ...response, user: blog.user } : blogFilter))
        dispatch({ notification: { message: `you liked a blog ${response.title} by ${response.author}`, type: 'success' } })
        setTimeout(() => {
          dispatch({notification: null})
        }, 5000)
      },
      onError: error => {
        console.log(error)
        dispatch({ notification: { message: `could not like`, type: 'error' } })
        setTimeout(() => {
          dispatch({notification: null})
        }, 5000)
      }
    })

    const removeMutation = useMutation({
      mutationFn: blogService.remove, 
      onSuccess: (response) => {
        if (response){
          const blogs = queryClient.getQueryData(['blogs'])
          queryClient.setQueryData(['blogs'], blogs.filter(blogFilter => blogFilter.id !== blog.id ))
          dispatch({ notification: { message: `you removed a blog ${blog.title} by ${blog.author}`, type: 'success' } })
          setTimeout(() => {
            dispatch({notification: null})
          }, 5000)
        } else {
          dispatch({ notification: { message: `could not remove`, type: 'error' } })
          setTimeout(() => {
            dispatch({notification: null})
          }, 5000)
        }
      },
      onError: error => {
        console.log(error)
        dispatch({ notification: { message: `could not remove`, type: 'error' } })
        setTimeout(() => {
          dispatch({notification: null})
        }, 5000)
      }
    })

    const handleLike = async (likedBlog) => {
      likeMutation.mutate(likedBlog)
    }

    const handleRemove = async (blogToRemove) => {
      if(window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)) {
        removeMutation.mutate(blogToRemove)
      }
    }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: user.username === blog.user.username ? '' : 'none' }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      <Expand visible={visible}>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button></div>
        <div>{blog.user.name}</div>
        <div style={showWhenVisible}><button onClick={() => handleRemove(blog)}>remove</button></div>
      </Expand>
    </div>
  )
}

export default Blog