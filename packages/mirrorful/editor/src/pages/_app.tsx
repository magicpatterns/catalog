import '../main.css'
import '../atom-one-dark.css'

import { Box } from '@chakra-ui/react'
import { MirrorfulThemeProvider } from '@mirrorful/core/lib/components/ThemeProvider'
import { defaultShadows } from '@mirrorful/core/lib/types'
import { motion } from 'framer-motion'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import { useRouter } from 'next/router'
import posthog from 'posthog-js'
import { useEffect, useState } from 'react'
import fetchStoreData from 'src/utils/fetchStoreData'
import useMirrorfulStore from 'src/zustand/useMirrorfulStore'

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
  const router = useRouter()
  const {
    setColors,
    setTypography,
    setShadows,
    setFileTypes,
    setShowOnBoarding,
  } = useMirrorfulStore((state) => state)
  // to fetch data

  useEffect(() => {
    const fetchStoredData = async () => {
      try {
        const data = await fetchStoreData()

        if (
          !Object.keys(data).length ||
          !data.tokens.colorData ||
          data.tokens.colorData.length === 0
        ) {
          setIsLoading(false)
          setShowOnBoarding(true)
          return
        }

        setColors(data.tokens.colorData ?? [])
        setTypography(data.tokens.typography)
        setShadows(data.tokens.shadows ?? defaultShadows)
        setFileTypes(data.files)
        setIsLoading(false)
      } catch (e) {
        // TODO: Handle error
      } finally {
        setIsLoading(false)
      }
    }
    // on initial load
    fetchStoredData()
  }, [])

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
    router.prefetch('/')
    router.prefetch('/typography')
    router.prefetch('/shadows')
  }, [router])

  return (
    <MirrorfulThemeProvider>
      {isLoading && router.pathname === '/' ? (
        <SplashScreen></SplashScreen>
      ) : (
        <Component {...pageProps} isLoading={isLoading} />
      )}
    </MirrorfulThemeProvider>
  )
  function SplashScreen() {
    return (
      <Box
        css={{
          display: 'flex',
          minHeight: '100dvh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 0.75,
            ease: 'easeIn',
            repeat: Infinity,
            repeatDelay: 0.25,
          }}
        >
          <Image
            width={50}
            height={50}
            src="/simple_logo.png"
            alt="Mirrorful"
          />
        </motion.div>
      </Box>
    )
  }
}
