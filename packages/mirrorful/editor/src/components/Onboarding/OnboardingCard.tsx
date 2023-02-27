import { Box, Text } from '@chakra-ui/react'

export function OnboardingCard({
  title,
  onClick,
}: {
  title: string
  onClick?: () => void
}) {
  return (
    <Box
      css={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '36px',
        border: '1px solid black',
        borderRadius: 8,
        cursor: 'pointer',
      }}
      _hover={{
        backgroundColor: 'green.300',
      }}
      onClick={() => {
        if (onClick) {
          onClick()
        }
      }}
    >
      <Box
        css={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Text css={{ textAlign: 'center', marginBottom: '20px' }}>{title}</Text>
        <Box
          bgColor="blue.400"
          css={{
            width: 150,
            height: 150,
          }}
        ></Box>
      </Box>
    </Box>
  )
}
