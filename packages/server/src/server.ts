import { register } from './api/generated'
import cors from 'cors'

import { getRegistryService } from './services/registry'
import express from 'express'
import * as Sentry from '@sentry/node'
import mongoose from 'mongoose'

const PORT = process.env.PORT || 8080
const app = express()

if (process.env.NODE_ENV === 'production') {
  /********** SENTRY STUFF ***********/
  Sentry.init({
    dsn: 'https://c7648714e078468fb6e5ece7a01eb3a7@o4505042156126208.ingest.sentry.io/4505042157371392',
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app }),
      ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
    ],
    tracesSampleRate: 1.0,
  })
  app.use(Sentry.Handlers.requestHandler())
  app.use(Sentry.Handlers.tracingHandler())
  app.use(Sentry.Handlers.errorHandler())
}
/*******************************/

/******* MONGO STUFF **********/
// TODO(Danilowicz): set up localhost for mongo
const connectionString =
  process.env.MIRRORFUL_MONGO_DB_URI || 'mongob://localhost:27017/mirrorful'

mongoose.connect(connectionString, { dbName: 'mirrorful' })
/****************************************/

app.use(cors())

app.get('/', function mainHandler(req, res) {
  res.send('Hello world, this is the Mirrorful Server')
})

register(app, {
  registry: getRegistryService(),
})

app.listen(PORT)
console.log(`🎉 Listening on port ${PORT}...`)
