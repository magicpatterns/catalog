import '../main.css'
import '../atom-one-dark.css'

import { MirrorfulThemeProvider } from '@mirrorful/core/lib/components/ThemeProvider'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import posthog from 'posthog-js'
import { useEffect } from 'react'
import fetchStoreData from 'src/utils/fetchStoreData'
import useMirrorfulStore from 'src/zustand/useMirrorfulStore'
import { defaultShadows } from '@mirrorful/core/lib/types'

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
  const { setColors, setTypography, setShadows, setFileTypes } =
    useMirrorfulStore((state) => state)
  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog.capture('$pageview')
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const fetchStoredData = async () => {
      const data = await fetchStoreData()
      if (
        !Object.keys(data).length ||
        !data.tokens.colorData ||
        data.tokens.colorData.length === 0
      ) {
        //  setIsLoading(false)
        //  setShowOnboarding(true)
        return
      }
      setColors(data.tokens.colorData ?? [])
      setTypography(data.tokens.typography)
      setShadows(data.tokens.shadows ?? defaultShadows)
      setFileTypes(data.files)
    }
    fetchStoredData()
  }, [])

  return (
    <MirrorfulThemeProvider>
      <Component {...pageProps} />
    </MirrorfulThemeProvider>
  )
}
