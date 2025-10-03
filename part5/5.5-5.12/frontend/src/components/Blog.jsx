import { useState } from 'react'
import Expand from './Expand'
import blogService from '../services/blogs'

const Blog = ({ blog, user, addedLike, removedBlog }) => {

  const [visible, setVisible] = useState(false)

  const handleLike = async () => {
    try{
      const request = await blogService.like(blog)
      request.user = blog.user
      addedLike(request)
    } catch (error){
      console.log(error)
    }
  }

  const handleRemove = async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      const resault = await blogService.remove(blog)
      resault ? removedBlog(blog) : console.log('could not remove')
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
        <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
        <div>{blog.user.name}</div>
        <div style={showWhenVisible}><button onClick={handleRemove}>remove</button></div>
      </Expand>
    </div>
  )
}

export default Blog