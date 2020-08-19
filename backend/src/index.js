const express = require('express')
const { request, response } = require('express')
const cors = require('cors')
const { v4, validate } = require('uuid')

const projects = []

const app = express()
app.use(cors())
app.use(express.json())


function logRequest(request, response, next) {
  const { method, url } = request
  const labelRequest = `[${method.toUpperCase()}] ${url}`
  console.time(labelRequest)
  next()
  console.timeEnd(labelRequest)
}

function validateProjectId(request, response, next) {
  const { id } = request.params
  if (!validate(id)) {
    return response.status(400).json({ error: 'invalid project ID.' })
  }
  return next()
}

app.use(logRequest)
app.use('/projects/:id', validateProjectId)

app.get('/projects', (request, response) => {
  const { title } = request.query

  const results = title ? projects.filter(project => project.title === title)
    : projects

  return response.json(results)
})

app.post('/projects', (request, response) => {
  const { title, owner } = request.body
  const project = { id: v4(), title, owner }
  projects.push(project)
  return response.json(project)
})

app.put('/projects/:id', validateProjectId, (request, response) => {
  const { id } = request.params
  const { title, owner } = request.body

  const projectIndex = projects.findIndex(project => project.id === id)

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'project not found' })
  }
  const project = { id, title, owner }

  projects[projectIndex] = project

  return response.json(project)
})

app.delete('/projects/:id', validateProjectId, (request, response) => {
  const { id } = request.params

  const projectIndex = projects.findIndex(project => project['id'] === id)

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'project not found' })
  }

  projects.splice(projectIndex, 1)

  return response.status(204).send()
})

app.listen(3333, () => {
  console.log('Back-end started')
})
