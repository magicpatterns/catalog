import { Box, Icon, Link } from '@chakra-ui/react'
import { EditableContent } from '@core/components/EditableContent'
import { TokenGroupRow } from '@core/components/Themes/TokenGroupRow'
import useMirrorfulStore, {
  MirrorfulState,
} from '@core/store/useMirrorfulStore'
import { assertTokenGroup, TTheme } from '@core/types'
import { TMirrorfulStore } from '@core/types'
import { FiChevronLeft } from 'react-icons/fi'

export function ThemeEditorPage({
  themeId,
  postStoreData,
}: {
  themeId: string
  postStoreData: (data: TMirrorfulStore) => Promise<void>
}) {
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
          color: 'var(--text-color-secondary)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Icon as={FiChevronLeft} css={{ marginRight: '4px' }} />
        Back to Themes
      </Link>
      <EditableContent
        type="heading"
        text={selectedTheme.name}
        onUpdateText={(updatedText: string) => {
          const updatedThemes = [...themes]

          const updatedThemeIndex = updatedThemes.findIndex(
            (t) => t.id === selectedTheme.id
          )

          updatedThemes[updatedThemeIndex].name = updatedText

          handleUpdateThemes(updatedThemes)
        }}
        css={{
          marginTop: '24px',
          fontSize: '2rem',
          fontWeight: 'bold',
          padding: '4px 8px',
        }}
      />
      <Box css={{ maxWidth: '500px', marginTop: '24px' }}>
        {Object.keys(selectedTheme.tokens).map((tokenKey) => {
          const currentValue = selectedTheme.tokens[tokenKey]

          if (assertTokenGroup(currentValue)) {
            return (
              <TokenGroupRow
                key={tokenKey}
                tokenKey={tokenKey}
                token={currentValue}
                theme={selectedTheme}
                onUpdateTheme={(updatedTheme) => {
                  const updatedThemes = [...themes]

                  const updatedThemeIndex = updatedThemes.findIndex(
                    (t) => t.id === updatedTheme.id
                  )

                  updatedThemes[updatedThemeIndex] = updatedTheme

                  handleUpdateThemes(updatedThemes)
                }}
                currentPath={tokenKey}
              />
            )
          }

          return null
        })}
      </Box>
    </Box>
  )
}
