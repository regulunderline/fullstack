require('dotenv').config()
const express = require('express')
const Phonebook = require('./models/phonebook')
const morgan = require('morgan')
const app = express()

app.use(express.static('dist'))
app.use(express.json())
morgan.token('reqdata', function (req, res) {return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqdata'))

app.get('/info', (request, response) => {
  requestDate = Date()
  response.send(`<div>Phonebook has info for ${persons.length} people</div><div>${requestDate}</div>`)
})

app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then(persons => {
      response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if(person){
    response.json(person)
  }else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!(body.name) && !(body.number)) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const person = new Phonebook({
    name : body.name,
    number : body.number
  })
  person.save().then(savedPerson => {
      response.json(savedPerson)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})