'use client'
import { Box, Button, Icon, Link } from '@chakra-ui/react'
import { postStoreData } from '@core/client/store'
import { EditableContent } from '@core/components/EditableContent'
import { LoginAlert } from '@core/components/LoginAlert'
import {
  deleteTokenOrGroupFromTheme,
  editTokenOrGroupInTheme,
} from '@core/components/Themes/themeUtils'
import {
  TokenCircle,
  TokenGroupRow,
} from '@core/components/Themes/TokenGroupRow'
import useMirrorfulStore, {
  MirrorfulState,
} from '@core/store/useMirrorfulStore'
import { assertTokenGroup, TTheme } from '@core/types'
import { useAuthInfo } from '@propelauth/react'
import { useRouter } from 'next/navigation'
import { FiChevronLeft } from 'react-icons/fi'

export function ThemeEditorPage({
  themeId,
  fetchStoreId,
}: {
  themeId: string
  fetchStoreId: () => Promise<string>
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
  const metadata = useMirrorfulStore((state: MirrorfulState) => state.metadata)

  const router = useRouter()
  const authInfo = useAuthInfo()

  const selectedTheme = themes.find((t) => t.id === themeId)

  if (!selectedTheme) {
    return null
  }

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

  return (
    <Box
      padding={{
        base: '24px 48px',
        md: '36px 72px',
        lg: '48px 96px',
      }}
    >
      <LoginAlert />
      <Link
        css={{
          fontWeight: 'bold',
          fontSize: '12px',
          color: 'var(--text-color-secondary)',
          display: 'flex',
          alignItems: 'center',
        }}
        onClick={() => {
          router.push('/themes')
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
      <Box css={{ maxWidth: '500px', marginTop: '36px' }}>
        {Object.keys(selectedTheme.tokens)
          .sort((tokenKey) => {
            const currentValue = selectedTheme.tokens[tokenKey]

            if (assertTokenGroup(currentValue)) {
              return 1
            } else {
              return -1
            }
          })
          .map((tokenKey) => {
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
            } else {
              return (
                <Box css={{ marginBottom: '16px' }} key={tokenKey}>
                  <TokenCircle
                    name={tokenKey}
                    value={currentValue.value}
                    path={`${tokenKey}.${tokenKey}`}
                    onEditToken={(token) => {
                      const updatedTheme = editTokenOrGroupInTheme({
                        originalPath: `${tokenKey}.${tokenKey}`,
                        updatedPath: token.path,
                        target: {
                          id: currentValue.id,
                          value: token.value,
                          type: 'color',
                        },
                        theme: selectedTheme,
                      })

                      const updatedThemes = [...themes]

                      const updatedThemeIndex = updatedThemes.findIndex(
                        (t) => t.id === updatedTheme.id
                      )

                      updatedThemes[updatedThemeIndex] = updatedTheme

                      handleUpdateThemes(updatedThemes)
                    }}
                    onDeleteToken={() => {
                      const updatedTheme = deleteTokenOrGroupFromTheme({
                        path: `${tokenKey}.${tokenKey}`,
                        theme: selectedTheme,
                      })
                      const updatedThemes = [...themes]

                      const updatedThemeIndex = updatedThemes.findIndex(
                        (t) => t.id === updatedTheme.id
                      )

                      updatedThemes[updatedThemeIndex] = updatedTheme

                      handleUpdateThemes(updatedThemes)
                    }}
                  />
                </Box>
              )
            }
          })}
      </Box>
      <Box css={{ marginTop: '36px' }}>
        <Button
          onClick={() => {
            const updatedThemes = [...themes]

            const updatedThemeIndex = updatedThemes.findIndex(
              (t) => t.id === selectedTheme.id
            )

            updatedThemes[updatedThemeIndex].tokens['UntitledGroup'] = {}

            handleUpdateThemes(updatedThemes)
          }}
        >
          Create New Group
        </Button>
      </Box>
    </Box>
  )
}
