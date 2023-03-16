import { Box } from '@chakra-ui/react'
import { Tokens } from '../../.mirrorful/theme'

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <Box
      css={{
        height: '100%',
        width: '100%',
        padding: '16px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: `1px solid ${Tokens.gray.base}`,
        borderRadius: '8px',
        backgroundColor: `rgba(190,190,190,0.2)`,
        backdropFilter: `blur(10px)`,
        color: 'white',
      }}
    >
      {children}
    </Box>
  )
}
