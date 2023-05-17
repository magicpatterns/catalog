import { AuthOptions, initAuth } from '@propelauth/express'

//@ts-ignore
let obj: AuthOptions = {}
if (process.env.NODE_ENV !== 'production') {
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
    // If true, error messages returned to the user will be detailed.
    // It's useful for debugging, but a good idea to turn off in production.
    debugMode: process.env.NODE_ENV !== 'production',
    // You can find your Auth URL and API key under the Backend Integration
    //   section for your project at https://app.propelauth.com.
    authUrl:
      process.env.PROPEL_AUTH_URL ?? 'https://607430308.propelauthtest.com',
    apiKey: process.env.PROPEL_AUTH_API_KEY ?? 'NO-KEY-FOUND',
    manualTokenVerificationMetadata: manualTokenVerificationMetadata,
  }
} else {
  obj = {
    // If true, error messages returned to the user will be detailed.
    // It's useful for debugging, but a good idea to turn off in production.
    debugMode: process.env.NODE_ENV !== 'production',
    // You can find your Auth URL and API key under the Backend Integration
    //   section for your project at https://app.propelauth.com.
    authUrl:
      process.env.PROPEL_AUTH_URL ?? 'https://607430308.propelauthtest.com',
    apiKey: process.env.PROPEL_AUTH_API_KEY ?? 'NO-KEY-FOUND',
  }
}

export const propelAuth = initAuth(obj)
