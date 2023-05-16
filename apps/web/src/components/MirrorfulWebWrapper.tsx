'use client'

import { getStore, postStoreData } from '@core/client/store'
import { Onboarding } from '@core/components/Onboarding'
import SplashScreen from '@core/components/SplashScreen'
import useMirrorfulStore, {
  MirrorfulState,
} from '@core/store/useMirrorfulStore'
import { defaultShadowsV2, TMirrorfulStore } from '@core/types'
import { useAuthInfo } from '@propelauth/react'
import { UseAuthInfoProps } from '@propelauth/react/dist/types/useAuthInfo'
import { LayoutWrapper } from '@web/components/LayoutWrapper'
import { useFetchStoreId } from '@web/hooks/useFetchStoreId'
import { usePostStoreIdToLocalStorage } from '@web/hooks/usePostStoreIdToLocalStorage'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function MirrorfulWebWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [postStoreIdToLocalStorage] = usePostStoreIdToLocalStorage()
  const authInfo = useAuthInfo()
  const [isLoading, setIsLoading] = useState(true)
  const [shouldForceSkipOnboarding, setShouldForceSkipOnboarding] =
    useState(false)
  const [showOnBoarding, setShowOnBoarding] = useState(false)
  const router = useRouter()
  const [fetchStoreId] = useFetchStoreId()

  const { setColors, setTypography, setShadows, setFileTypes, setThemes } =
    useMirrorfulStore((state: MirrorfulState) => state)

  const [storeId, setStoreId] = useState<string>('')

  // to fetch data
  const timeout = useRef<NodeJS.Timeout | null>(null)
  const fetchStoredData = useCallback(async () => {
    try {
      setIsLoading(true)
      const storeId = await fetchStoreId()
      setStoreId(storeId)
      const data = await getStore({
        authInfo: authInfo,
        storeId: storeId,
      })
      if (
        !data ||
        Object.keys(data).length === 0 ||
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        Object.keys(data.primitives.colors).length === 0
      ) {
        setShowOnBoarding(true)
        return
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      setThemes(data.themes ?? [])
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      setColors(data.primitives.colors ?? {})
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      setTypography(data.primitives.typography)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      setShadows(data.primitives.shadows ?? defaultShadowsV2)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      setFileTypes(data.files)

      setStoreId(storeId)

      await postStoreIdToLocalStorage(storeId)
    } catch (e) {
      throw e
    } finally {
      timeout.current = setTimeout(() => {
        setIsLoading(false)
      }, 1250)
    }
  }, [
    authInfo,
    fetchStoreId,
    setThemes,
    setColors,
    setTypography,
    setShadows,
    setFileTypes,
    postStoreIdToLocalStorage,
  ])

  useEffect(() => {
    // on initial load
    fetchStoredData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    router.prefetch('/colors')
    router.prefetch('/typography')
    router.prefetch('/shadows')
    router.prefetch('/themes')
    router.prefetch('/components')
  }, [router])

  const handleOnboardingSubmit = async (
    data: TMirrorfulStore,
    authInfo: UseAuthInfoProps,
    storeId: string
  ) => {
    setStoreId(storeId)
    postStoreIdToLocalStorage(storeId)
    postStoreData({ newData: data, authInfo: authInfo, storeId })
    setColors(data.primitives.colors)
    setShadows(data.primitives.shadows)
    setTypography(data.primitives.typography)
    setFileTypes(data.files)
  }

  return (
    <>
      {(isLoading || authInfo.loading) && <SplashScreen />}
      {!shouldForceSkipOnboarding && showOnBoarding ? (
        <Onboarding
          postStoreIdToLocalStorage={postStoreIdToLocalStorage}
          postStore={handleOnboardingSubmit}
          onFinishOnboarding={() => {
            setShowOnBoarding(false)
            setShouldForceSkipOnboarding(true)
          }}
          platform={'web'}
        />
      ) : (
        <LayoutWrapper storeId={storeId}>{children}</LayoutWrapper>
      )}
    </>
  )
}
