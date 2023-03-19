import { Box, Heading } from '@chakra-ui/react'

export function OnboardingContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Box
      css={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
      }}
    >
      <Box
        css={{
          backgroundColor: 'white',
          padding: '64px 128px',
          borderRadius: 8,
          height: '50%',
        }}
        shadow="2xl"
        width={{
          base: '100%',
          md: '80%',
          lg: '75%',
        }}
        minHeight={'600px'}
        minWidth={'700px'}
        maxWidth={'1000px'}
        padding={{
          base: '24px',
          md: '64px 64px',
          //   lg: '64px 128px',
        }}
        maxHeight={'700px'}
      >
        {children}
      </Box>
    </Box>
  )
}
