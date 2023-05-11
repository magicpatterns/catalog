import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { CreateThemeCard, ThemeCard } from '@core/components/Themes/ThemeCard'
import useMirrorfulStore, {
  MirrorfulState,
} from '@core/store/useMirrorfulStore'
import { defaultTheme, TTheme } from '@core/types'
import { TMirrorfulStore } from '@core/types'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

export function ThemesPage({
  postStoreData,
}: {
  postStoreData: (data: TMirrorfulStore) => Promise<void>
}) {
  const router = useRouter()
  const { typography, colors, shadows, fileTypes, themes, setThemes } =
    useMirrorfulStore((state: MirrorfulState) => state)

  const handleUpdateThemes = async (data: TTheme[]) => {
    setThemes(data)
    await postStoreData({
      primitives: { colors, typography, shadows },
      themes: data,
      files: fileTypes,
    })
  }

  const handleCreateNewTheme = async () => {
    const newTheme = {
      id: uuidv4(),
      name: 'Untitled Theme',
      tokens: defaultTheme.tokens,
    }

    handleUpdateThemes([...themes, newTheme])
    router.push(`/themes/${newTheme.id}`)
  }

  return (
    <>
      <Heading fontSize={'2.5rem'} fontWeight="black">
        Themes
      </Heading>
      <Box display="flex" justifyContent="space-between">
        <Text
          fontSize={'1.2rem'}
          fontWeight="medium"
          color="gray.600"
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
