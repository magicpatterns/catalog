import express from 'express'

import { register } from './api/generated'

import { getRegistryService } from './services/registry'

const PORT = 8080

const app = express()

// app.use(express.json({ limit: '50mb' }))

register(app, {
  registry: getRegistryService(),
})

app.listen(PORT)

console.log(`🎉 Listening on port ${PORT}...`)
