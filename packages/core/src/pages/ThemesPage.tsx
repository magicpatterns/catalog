import { Box, Text } from '@chakra-ui/react'
import { TokenGroupRow } from '@core/components/Themes/TokenGroupRow'
import { defaultTheme, TTheme, TTokenGroup } from '@core/types'
import { useState } from 'react'

export function ThemesPage() {
  const [theme, setTheme] = useState<TTheme>(defaultTheme)

  console.log(theme)
  return (
    <Box>
      <Text>{theme.name}</Text>
      <Box css={{ maxWidth: '500px' }}>
        <TokenGroupRow
          tokenKey={'colors'}
          token={theme.tokens.colors as TTokenGroup}
          theme={theme}
          onUpdateTheme={(updatedTheme: TTheme) => setTheme(updatedTheme)}
        />
      </Box>
    </Box>
  )
}
