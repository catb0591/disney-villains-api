/* eslint-disable no-console */
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { getAll, getBySlug, createNew } = require('./controllers/villains')

app.get('/villains', getAll)

app.get('/villains/:slug', getBySlug)

app.post('/villains', bodyParser.json(), createNew)

app.all('*', (request, response) => {
  response.sendStatus(404)
})

app.listen(1337, () => {
  console.log('Listening on http://localhost:1337/villains...')
})
