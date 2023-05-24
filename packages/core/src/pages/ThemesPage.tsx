'use client'
import { Box, Heading, Text } from '@chakra-ui/react'
import { postStoreData } from '@core/client/store'
import { LoginAlert } from '@core/components/LoginAlert'
import { ONBOARDING_IDS } from '@core/components/ProductOnboardings/constants'
import { ThemeOnboarding } from '@core/components/ProductOnboardings/ThemeOnboarding'
import { CreateThemeCard, ThemeCard } from '@core/components/Themes/ThemeCard'
import useMirrorfulStore, {
  MirrorfulState,
} from '@core/store/useMirrorfulStore'
import { defaultTheme, TTheme } from '@core/types'
import { useAuthInfo } from '@propelauth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export function ThemesPage({
  fetchStoreId,
}: {
  fetchStoreId: () => Promise<string>
}) {
  const authInfo = useAuthInfo()
  const router = useRouter()

  const [showOnboarding, setShowOnboarding] = useState<boolean>(false)

  const colors = useMirrorfulStore((state: MirrorfulState) => state.colors)
  const typography = useMirrorfulStore(
    (state: MirrorfulState) => state.typography
  )
  const shadows = useMirrorfulStore((state: MirrorfulState) => state.shadows)
  const fileTypes = useMirrorfulStore(
    (state: MirrorfulState) => state.fileTypes
  )
  const themes = useMirrorfulStore((state: MirrorfulState) => state.themes)
  const setThemes = useMirrorfulStore(
    (state: MirrorfulState) => state.setThemes
  )
  const metadata = useMirrorfulStore((state: MirrorfulState) => state.metadata)
  const setMetadata = useMirrorfulStore(
    (state: MirrorfulState) => state.setMetadata
  )
  const isLoaded = useMirrorfulStore((state: MirrorfulState) => state.isLoaded)
  const handleUpdateThemes = async (data: TTheme[]) => {
    setThemes(data)
    const storeId = await fetchStoreId()
    await postStoreData({
      newData: {
        primitives: { colors, typography, shadows },
        themes: data,
        files: fileTypes,
        metadata,
      },
      authInfo: authInfo,
      storeId,
    })
  }
  const handleCloseThemeOnboarding = async () => {
    const updatedMetadata = {
      ...metadata,
      completedOnboardings: [
        ...metadata.completedOnboardings,
        ONBOARDING_IDS.THEMES,
      ],
    }
    setShowOnboarding(false)
    setMetadata(updatedMetadata)

    const storeId = await fetchStoreId()
    await postStoreData({
      newData: {
        primitives: { colors, typography, shadows },
        themes,
        files: fileTypes,
        metadata: updatedMetadata,
      },
      authInfo,
      storeId,
    })
  }

  const handleCreateNewTheme = async (initWithDefaults?: boolean) => {
    const newTheme = {
      id: uuidv4(),
      name: 'Untitled Theme',
      tokens: initWithDefaults ? defaultTheme.tokens : {},
    }
    handleUpdateThemes([...themes, newTheme])
  }

  useEffect(() => {
    if (isLoaded) {
      if (!metadata.completedOnboardings.includes(ONBOARDING_IDS.THEMES)) {
        setShowOnboarding(true)
      }
    }
  }, [isLoaded])

  return (
    <Box
      padding={{
        base: '24px 48px',
        md: '36px 72px',
        lg: '48px 96px',
      }}
    >
      <LoginAlert />
      <Heading
        fontSize={'2.5rem'}
        fontWeight="black"
        color="var(--text-color-primary)"
      >
        Themes
      </Heading>
      <Box display="flex" justifyContent="space-between">
        <Text
          fontSize={'1.2rem'}
          fontWeight="medium"
          color="var(--text-color-secondary)"
          css={{ marginTop: '12px' }}
        >
          {`Manage the colors and mappings in your themes.`}
        </Text>
      </Box>
      <Box css={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap' }}>
        {themes.map((theme) => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            onSelectTheme={() => {
              router.push(`/themes/${theme.id}`)
            }}
            contextMenuActions={{
              onDuplicateTheme: () => {
                const newTheme = structuredClone(theme)
                newTheme.id = uuidv4()
                newTheme.name = `${theme.name} Copy`

                handleUpdateThemes([...themes, newTheme])
              },
              onDeleteTheme: () => {
                const updatedThemes = [...themes].filter(
                  (t) => t.id !== theme.id
                )
                handleUpdateThemes(updatedThemes)
              },
            }}
          />
        ))}
        <CreateThemeCard onCreateTheme={() => handleCreateNewTheme(false)} />
      </Box>
      <ThemeOnboarding
        isOpen={showOnboarding}
        onClose={() => handleCloseThemeOnboarding()}
        onStart={(type: 'template' | 'scratch') => {
          if (type === 'template') {
            handleCreateNewTheme(true)
          } else {
            handleCreateNewTheme(false)
          }
          handleCloseThemeOnboarding()
        }}
      />
    </Box>
  )
}
