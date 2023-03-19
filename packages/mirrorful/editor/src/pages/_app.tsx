import type { AppProps } from 'next/app'
import { MirrorfulThemeProvider } from '@mirrorful/core/lib/components/ThemeProvider'
import '../main.css'
import '../atom-one-dark.css'
import posthog from 'posthog-js'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

if (typeof window !== 'undefined') {
  // This ensures that as long as we are client-side, posthog is always ready
  posthog.init('phc_Fi1SAV5Xhkmrf5VwIweTTmZDNnUIWmXkvXr7naLsNVV', {
    api_host: 'https://app.posthog.com',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.opt_out_capturing()
    },
  })
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog.capture('$pageview')
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <MirrorfulThemeProvider>
      <Component {...pageProps} />
    </MirrorfulThemeProvider>
  )
}
