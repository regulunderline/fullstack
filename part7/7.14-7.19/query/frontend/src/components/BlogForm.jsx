import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useNotificationDispatch } from '../NotificationContext'

const BlogForm = ({ user }) => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create, 
    onSuccess: (response) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat({ ...response, user: { name: user.name, username: user.username } }))
      dispatch({ notification: { message: `a new blog ${response.title} by ${response.author}`, type: 'success' } })
      setTimeout(() => {
        dispatch({notification: null})
      }, 5000)
    },
    onError: error => {
      console.log(error)
      dispatch({ notification: { message: `could not create a blog`, type: 'error' } })
      setTimeout(() => {
        dispatch({notification: null})
      }, 5000)
    }
  })

  const addBlog = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    newBlogMutation.mutate({ title, author, url })
}

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>
            title:
            <input name="title"/>
          </label>
        </div>
        <div>
          <label>
            author:
            <input name="author"/>
          </label>
        </div>
        <div>
          <label>
            url:
            <input name="url"/>
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm