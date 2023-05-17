import { AuthOptions, initAuth } from '@propelauth/express'

//@ts-ignore
let obj: AuthOptions = {}

if (process.env.NODE_ENV !== 'production') {
  // if we have an api key in dev, use that
  if (!process.env.PROPEL_AUTH_API_KEY) {
    const manualTokenVerificationMetadata = {
      verifierKey: `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5JcoTz1xT0EDqB3TvjT3
    G3fCB5L/Vx/JYiZBGVp/EbiRzNVLJR18bnwll9/P8WRFQZ90+Pq40WhsYMW/8Ugt
    1XkaMcPWKSMi9qNOMGY5Xl49HMeraLoQjVwySjZu8hOFB2/fMI8T25ZJjJIwaNIC
    CVRwTTo4l4Fa6HD6jZxat1o/lFn1IWwJMiZ+nBXqrKpZcm72/4eQltgc8uNANNMJ
    SH6RbJJxz6j22suILC7YzY1JVE8DHAbMtWtDrTrY7yUuI08QBJsIGYCpDgpj7iEU
    x/bXkTqb62sno58B+42Y51wGpyB50K20/yslWRkwl0JvisDLRzv7QGDAbYd6IUvv
    iQIDAQAB
    -----END PUBLIC KEY-----
    `,
      issuer: 'https://607430308.propelauthtest.com',
    }
    obj = {
      debugMode: true,
      authUrl: 'https://607430308.propelauthtest.com',
      apiKey: process.env.PROPEL_AUTH_API_KEY ?? 'NO-KEY-FOUND',
      manualTokenVerificationMetadata: manualTokenVerificationMetadata,
    }
  } else {
    obj = {
      debugMode: true,
      authUrl: 'https://607430308.propelauthtest.com',
      apiKey: process.env.PROPEL_AUTH_API_KEY ?? 'NO-KEY-FOUND',
    }
  }
} else {
  if (!process.env.PROPEL_AUTH_URL || !process.env.PROPEL_AUTH_API_KEY) {
    throw Error('Missing Propel Auth URL or API Key in production')
  }
  obj = {
    debugMode: false,
    authUrl: process.env.PROPEL_AUTH_URL,
    apiKey: process.env.PROPEL_AUTH_API_KEY,
  }
}

export const propelAuth = initAuth(obj)
