'use client'

import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { postStoreData } from '@core/client/store'
import { CreateThemeCard, ThemeCard } from '@core/components/Themes/ThemeCard'
import useMirrorfulStore, {
  MirrorfulState,
} from '@core/store/useMirrorfulStore'
import { defaultTheme, TTheme } from '@core/types'
import { useAuthInfo } from '@propelauth/react'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

export function ThemesPage({
  fetchStoreId,
}: {
  fetchStoreId: () => Promise<string>
}) {
  const authInfo = useAuthInfo()
  const router = useRouter()
  const { typography, colors, shadows, fileTypes, themes, setThemes } =
    useMirrorfulStore((state: MirrorfulState) => state)

  const handleUpdateThemes = async (data: TTheme[]) => {
    setThemes(data)
    const storeId = await fetchStoreId()
    await postStoreData({
      newData: {
        primitives: { colors, typography, shadows },
        themes: data,
        files: fileTypes,
      },
      authInfo: authInfo,
      storeId,
    })
  }

  const handleCreateNewTheme = async () => {
    const newTheme = {
      id: uuidv4(),
      name: 'Untitled Theme',
      tokens: defaultTheme.tokens,
    }
    router.push(`/themes/${newTheme.id}`)
    handleUpdateThemes([...themes, newTheme])
  }

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
          <CreateThemeCard onCreateTheme={handleCreateNewTheme} />
        </Stack>
      </Box>
    </>
  )
}
