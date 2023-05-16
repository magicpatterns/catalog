import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { ONBOARDING_IDS } from '@core/components/ProductOnboardings/constants'
import { ThemeOnboarding } from '@core/components/ProductOnboardings/ThemeOnboarding'
import { CreateThemeCard, ThemeCard } from '@core/components/Themes/ThemeCard'
import useMirrorfulStore, {
  MirrorfulState,
} from '@core/store/useMirrorfulStore'
import { defaultTheme, TTheme } from '@core/types'
import { TMirrorfulStore } from '@core/types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export function ThemesPage({
  postStoreData,
}: {
  postStoreData: (data: TMirrorfulStore) => Promise<void>
}) {
  const router = useRouter()
  const {
    typography,
    colors,
    shadows,
    fileTypes,
    themes,
    setThemes,
    metadata,
  } = useMirrorfulStore((state: MirrorfulState) => state)
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false)

  const handleUpdateThemes = async (data: TTheme[]) => {
    setThemes(data)
    await postStoreData({
      primitives: { colors, typography, shadows },
      themes: data,
      files: fileTypes,
      metadata,
    })
  }

  const handleCreateNewTheme = async (initWithDefaults?: boolean) => {
    const newTheme = {
      id: uuidv4(),
      name: 'Untitled Theme',
      tokens: initWithDefaults ? defaultTheme.tokens : {},
    }

    handleUpdateThemes([...themes, newTheme])
    router.push(`/themes/${newTheme.id}`)
  }

  useEffect(() => {
    if (!metadata.completedOnboardings.includes(ONBOARDING_IDS.THEMES)) {
      setShowOnboarding(true)
    }
  }, [])

  return (
    <>
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
      <Box css={{ marginTop: '24px' }}>
        <Stack direction="row" spacing={8} flexWrap="wrap">
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
        </Stack>
      </Box>
      <ThemeOnboarding
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onStart={(type: 'template' | 'scratch') => {
          if (type === 'template') {
            handleCreateNewTheme(true)
          } else {
            handleCreateNewTheme(false)
          }
          setShowOnboarding(false)
        }}
      />
    </>
  )
}
