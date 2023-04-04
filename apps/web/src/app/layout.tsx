'use client'
import './globals.css'
import './atom-one-dark.css'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { Onboarding } from '@core/components/Onboarding'
import SplashScreen from '@core/components/SplashScreen'
import useMirrorfulStore, {
  MirrorfulState,
} from '@core/store/useMirrorfulStore'
import { defaultConfig, defaultShadows, TConfig } from '@core/types'
import useFetchStoreData from '@web/hooks/useFetchStoreData'
import { useLocalStorage } from '@web/hooks/useLocalStorage'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [shouldForceSkipOnboarding, setShouldForceSkipOnboarding] =
    useState(false)
  const [showOnBoarding, setShowOnBoarding] = useState(false)
  const router = useRouter()

  const { setColors, setTypography, setShadows, setFileTypes } =
    useMirrorfulStore((state: MirrorfulState) => state)

  const [fetchStoreData] = useFetchStoreData()

  // to fetch data
  const timeout = useRef<NodeJS.Timeout | null>(null)
  const fetchStoredData = useCallback(async () => {
    const data = fetchStoreData()
    try {
      if (
        !Object.keys(data).length ||
        !data.tokens.colorData ||
        data.tokens.colorData.length === 0
      ) {
        setShowOnBoarding(true)
        return
      }

      setColors(data.tokens.colorData ?? [])
      setTypography(data.tokens.typography)
      setShadows(data.tokens.shadows ?? defaultShadows)
      setFileTypes(data.files)
    } catch (e) {
      // TODO: Handle error
    } finally {
      timeout.current = setTimeout(() => {
        setIsLoading(false)
      }, 1250)
    }
  }, [fetchStoreData, setColors, setFileTypes, setShadows, setTypography])
  useEffect(() => {
    // on initial load
    fetchStoredData()
  }, [fetchStoredData])

  useEffect(() => {
    router.prefetch('/colors')
    router.prefetch('/typography')
    router.prefetch('/shadows')
  }, [router])

  useEffect(() => {
    if (!showOnBoarding && shouldForceSkipOnboarding) {
      fetchStoredData()
    }
  }, [fetchStoredData, shouldForceSkipOnboarding, showOnBoarding])
  return (
    <html lang="en">
      <body>
        <CacheProvider>
          <ChakraProvider>
            {isLoading && <SplashScreen></SplashScreen>}
            {!shouldForceSkipOnboarding && showOnBoarding ? (
              // TODO extract postStoreData and fetchStoreData into hooks
              <Onboarding
                postStoreData={async (newData: TConfig) => {
                  setData(newData)
                }}
                onFinishOnboarding={() => {
                  setShowOnBoarding(false)
                  setShouldForceSkipOnboarding(true)
                }}
                platform={'web'}
              />
            ) : null}
            {children}
          </ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  )
}
