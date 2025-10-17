import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getOne = async (id) => {
    const request = await axios.get(`${baseUrl}/${id}`)
    return request.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const like = async blog => {
  const config = {
    headers: { Authorization: token }
  }

  const newBlog = {
    user: blog.user.id,
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url:blog.url
  }

  const response = await axios.put(`${baseUrl}/${blog.id}`, newBlog, config)
  return response.data
}

const remove = async blog => {
  const config = {
    headers: { Authorization: token }
  }

  try{
    await axios.delete(`${baseUrl}/${blog.id}`, config)
    return true
  } catch (error){
    return false
  }
}

const comment = async ({ id, comment }) => {
  const config = {
    headers: { Authorization: token }
  }

  try{
    const response = await axios.post(`${baseUrl}/${id}/comments`, { comment }, config)
    return response.data
  } catch (error){
    return error
  }
}

export default { getAll, getOne, setToken, create, like, remove, comment }