import { initAuth } from '@propelauth/express'

export const propelAuth = initAuth({
  // If true, error messages returned to the user will be detailed.
  // It's useful for debugging, but a good idea to turn off in production.
  debugMode: process.env.NODE_ENV !== 'production',
  // You can find your Auth URL and API key under the Backend Integration
  //   section for your project at https://app.propelauth.com.
  authUrl:
    process.env.PROPEL_AUTH_URL ?? 'https://607430308.propelauthtest.com',
  apiKey: process.env.PROPEL_AUTH_API_KEY ?? 'NO-KEY-FOUND',
})
