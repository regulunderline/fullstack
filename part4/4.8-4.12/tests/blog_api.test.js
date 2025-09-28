const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 1,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 2,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstr',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 10,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('is id named right', async () => {
  const response = await api.get('/api/blogs')
  assert(response.body[0].id)
})

test('a valid blog can be added ', async () => {
  await api
    .post('/api/blogs')
    .send({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstr',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 10,
    })
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogs = await Blog.find({})
  assert.strictEqual(blogs.length, initialBlogs.length +1)
})

test('the default number of likes is 0', async () => {
  const response = await api
    .post('/api/blogs')
    .send({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstr',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    })

  assert.equal(response.body.likes, 0)
})

test('missing title or url', async () => {
  await api
    .post('/api/blogs')
    .send({
      author: 'Edsger W. Dijkstr',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 10,
    })
    .expect(400)
  await api
    .post('/api/blogs')
    .send({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstr',
      likes: 10,
    })
    .expect(400)
})

after(async () => {
  await mongoose.connection.close()
})