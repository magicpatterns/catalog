import { Box, Heading, Icon, Link } from '@chakra-ui/react'
import { EditableHeader } from '@core/components/EditableHeader'
import { TokenGroupRow } from '@core/components/Themes/TokenGroupRow'
import useMirrorfulStore, {
  MirrorfulState,
} from '@core/store/useMirrorfulStore'
import { TTheme, TTokenGroup } from '@core/types'
import { TMirrorfulStore } from '@core/types'
import { FiChevronLeft } from 'react-icons/fi'

export function ThemeEditorPage({
  themeId,
  postStoreData,
}: {
  themeId: string
  postStoreData: (data: TMirrorfulStore) => Promise<void>
}) {
  const { typography, colors, shadows, fileTypes, themes, setThemes } =
    useMirrorfulStore((state: MirrorfulState) => state)

  const selectedTheme = themes.find((t) => t.id === themeId)

  if (!selectedTheme) {
    return null
  }

  const handleUpdateThemes = async (data: TTheme[]) => {
    setThemes(data)
    await postStoreData({
      primitives: { colors, typography, shadows },
      themes: data,
      files: fileTypes,
    })
  }

  return (
    <Box>
      <Link
        href="/themes"
        css={{
          fontWeight: 'bold',
          fontSize: '12px',
          color: 'gray',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Icon as={FiChevronLeft} css={{ marginRight: '4px' }} />
        BACK TO THEMES
      </Link>
      <EditableHeader
        text={selectedTheme.name}
        onUpdateText={(updatedText: string) => {
          const updatedThemes = [...themes]

          const updatedThemeIndex = updatedThemes.findIndex(
            (t) => t.id === selectedTheme.id
          )

          updatedThemes[updatedThemeIndex].name = updatedText

          handleUpdateThemes(updatedThemes)
        }}
      />
      <Box css={{ maxWidth: '500px' }}>
        <TokenGroupRow
          tokenKey={'colors'}
          token={selectedTheme.tokens.colors as TTokenGroup}
          theme={selectedTheme}
          onUpdateTheme={(updatedTheme) => {
            const updatedThemes = [...themes]

            const updatedThemeIndex = updatedThemes.findIndex(
              (t) => t.id === updatedTheme.id
            )

            updatedThemes[updatedThemeIndex] = updatedTheme

            handleUpdateThemes(updatedThemes)
          }}
        />
      </Box>
    </Box>
  )
}
