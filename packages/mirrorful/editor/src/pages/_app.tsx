import '../main.css'
import '../atom-one-dark.css'
import '../blocks.css'

import { Onboarding } from '@mirrorful/core/lib/components/Onboarding'
import SplashScreen from '@mirrorful/core/lib/components/SplashScreen'
import { MirrorfulThemeProvider } from '@mirrorful/core/lib/components/ThemeProvider'
import useMirrorfulStore, {
  MirrorfulState,
} from '@mirrorful/core/lib/store/useMirrorfulStore'
import { defaultShadowsV2 } from '@mirrorful/core/lib/types'
import { AuthProvider } from '@propelauth/react'
import type { AppProps } from 'next/app'
import { usePathname, useRouter } from 'next/navigation'
import posthog from 'posthog-js'
import { useCallback, useEffect, useRef, useState } from 'react'
import { LayoutWrapper } from 'src/components/LayoutWrapper'

import { fetchStoreData } from '../utils/fetchStoreData'
import { postStoreData } from '../utils/postStoreData'

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
  const [isLoading, setIsLoading] = useState(true)
  const [shouldForceSkipOnboarding, setShouldForceSkipOnboarding] =
    useState(false)
  const [showOnBoarding, setShowOnBoarding] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const oldPathname = useRef<string>('')

  const { setColors, setTypography, setShadows, setFileTypes, setThemes } =
    useMirrorfulStore((state: MirrorfulState) => state)

  // to fetch data
  const timeout = useRef<NodeJS.Timeout | null>(null)
  const fetchStoredData = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await fetchStoreData()

      if (!data || Object.keys(data.primitives.colors).length === 0) {
        setShowOnBoarding(true)
        return
      }

      setThemes(data.themes ?? [])
      setColors(data.primitives.colors ?? {})
      setTypography(data.primitives.typography)
      setShadows(data.primitives.shadows ?? defaultShadowsV2)
      setFileTypes(data.files)
    } catch (e) {
      // TODO: Handle error
    } finally {
      timeout.current = setTimeout(() => {
        setIsLoading(false)
      }, 1250)
    }
  }, [
    setColors,
    setFileTypes,
    setShadows,
    setShowOnBoarding,
    setTypography,
    setThemes,
  ])

  useEffect(() => {
    // only initial render assign pathname
    oldPathname.current = pathname
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // on initial load
    fetchStoredData()
  }, [fetchStoredData])

  useEffect(() => {
    // Track page views
    if (oldPathname.current !== pathname) {
      oldPathname.current = pathname
      posthog.capture('$pageview')
    }
  }, [pathname])

  useEffect(() => {
    router.prefetch('/colors')
    router.prefetch('/typography')
    router.prefetch('/shadows')
    router.prefetch('/themes')
    router.prefetch('/components')
  }, [router])

  useEffect(() => {
    if (!showOnBoarding && shouldForceSkipOnboarding) {
      fetchStoredData()
    }
  }, [fetchStoredData, shouldForceSkipOnboarding, showOnBoarding])

  return (
    <AuthProvider
      authUrl={
        process.env.NEXT_PUBLIC_AUTH_URL ??
        'https://607430308.propelauthtest.com'
      }
    >
      <MirrorfulThemeProvider>
        {isLoading && <SplashScreen />}
        {!shouldForceSkipOnboarding && showOnBoarding ? (
          <Onboarding
            postNextJsStore={postStoreData}
            onFinishOnboarding={() => {
              setShowOnBoarding(false)
              setShouldForceSkipOnboarding(true)
            }}
            platform={'package'}
          />
        ) : (
          <LayoutWrapper postNextJsStore={postStoreData}>
            <Component {...pageProps} />
          </LayoutWrapper>
        )}
      </MirrorfulThemeProvider>
    </AuthProvider>
  )
}
