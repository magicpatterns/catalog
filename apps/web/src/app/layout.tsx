'use client'
import '@blocks/index.css'
import './globals.css'
import './atom-one-dark.css'

import { CacheProvider } from '@chakra-ui/next-js'
import { MirrorfulThemeProvider } from '@core/components/ThemeProvider'
import { AuthProvider } from '@propelauth/react'
import posthog from 'posthog-js'

import MirrorfulStoreProvider from '../components/MirrorfulStoreProvider'

if (typeof window !== 'undefined') {
  // This ensures that as long as we are client-side, posthog is always ready
  posthog.init('phc_Fi1SAV5Xhkmrf5VwIweTTmZDNnUIWmXkvXr7naLsNVV', {
    api_host: 'https://app.posthog.com',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.opt_out_capturing()
    },
  })
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Mirrorful Editor</title>
        <meta property="og:title" content="Mirrorful" key="title" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          property="og:image"
          content="https://mirrorful-production.s3.us-west-1.amazonaws.com/assets/components_graphic_dark.png"
        />
        <meta
          property="og:description"
          content="Create, edit, and manage your app's theme."
        />
        <meta
          name="description"
          content="Create, edit, and manage your app's theme."
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="https://mirrorful-production.s3.us-west-1.amazonaws.com/assets/components_graphic_dark.png"
        />
        <link
          rel="preload"
          href="https://mirrorful-production.s3.us-west-1.amazonaws.com/assets/components_graphic_light.png"
        />
      </head>
      <body>
        <AuthProvider
          authUrl={
            process.env.NEXT_PUBLIC_AUTH_URL ??
            'https://607430308.propelauthtest.com'
          }
        >
          <CacheProvider>
            <MirrorfulThemeProvider>
              <MirrorfulStoreProvider>{children}</MirrorfulStoreProvider>
            </MirrorfulThemeProvider>
          </CacheProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
