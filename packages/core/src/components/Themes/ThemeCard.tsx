import { Box, Text } from '@chakra-ui/react'
import useMirrorfulStore from '@core/store/useMirrorfulStore'
import { TTheme } from '@core/types'

import { flattenTheme } from './themeUtils'

export function ThemeCard({
  theme,
  onSelectTheme,
}: {
  theme: TTheme
  onSelectTheme: () => void
}) {
  const { colors } = useMirrorfulStore()

  const colorValues = flattenTheme({ theme, colors })

  return (
    <Box
      onClick={onSelectTheme}
      css={{
        borderRadius: 8,
        border: '1px solid gray',
        width: '190px',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s ease-in-out',
      }}
      _hover={{
        boxShadow: '0 0 20px 1px lightgray',
      }}
    >
      <Box css={{ height: '150px', display: 'flex' }}>
        {colorValues.map((color, index) => (
          <Box
            key={`${index}-${color}`}
            css={{ width: '15px', height: '15px', backgroundColor: color }}
          />
        ))}
      </Box>
      <Box
        css={{
          height: '50px',
          padding: '12px',
          display: 'flex',
          alignItems: 'center',
          borderTop: '1px solid gray',
        }}
      >
        <Text fontSize="md" fontWeight="bold">
          {theme.name}
        </Text>
      </Box>
    </Box>
  )
}
