import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, commentBlog } from '../reducers/blogReducer'
import { Link, useParams } from "react-router-dom"

const Blog = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const blog = useSelector(({ blogs }) => blogs.find(blog => blog.id === id))

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleComment = event => {
    event.preventDefault()
    const comment=event.target.comment.value
    event.target.comment.value=''
    dispatch(commentBlog({ id, comment }))
  }

  if (!blog){
    return <div>loading...</div>
  }

  return (
    <div>
      <h1>{blog.title} {blog.author}</h1>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>{blog.likes} likes<button onClick={handleLike}>like</button></p>
      <p>added by {blog.user.name}</p>
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input name="comment" /><button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
      </ul>
    </div>
  )
}

export default Blog