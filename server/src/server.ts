import express from 'express'

import { register } from './api/generated'
import imdb from './services/imdb'

const PORT = 8080

const app = express()

register(app, {
  imdb,
})

app.listen(PORT)

console.log(`🎉 Listening on port ${PORT}...`)
