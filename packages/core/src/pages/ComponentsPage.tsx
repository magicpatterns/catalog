import { Box, Button, Heading, Text, useColorMode } from '@chakra-ui/react'

export function ComponentsPage() {
  const { colorMode } = useColorMode()

  return (
    <Box>
      <Heading fontSize={'2.5rem'} fontWeight="black">
        Components
      </Heading>
      <Box display="flex" justifyContent="space-between">
        <Text
          fontSize={'1.2rem'}
          fontWeight="medium"
          color="var(--text-color-secondary)"
          css={{ marginTop: '12px' }}
        >
          {`Mirrorful Components is in early alpha — get early access!`}
        </Text>
      </Box>
      <Box css={{ width: '60%', marginTop: '80px' }}>
        <img
          src={
            colorMode === 'dark'
              ? '/components_graphic_dark.png'
              : '/components_graphic_light.png'
          }
        />
        <Button
          css={{ marginTop: '64px' }}
          onClick={() => {
            window.open('https://forms.gle/tidLkuXsScz1Edj28', '_blank')
          }}
        >
          Get Early Access
        </Button>
      </Box>
    </Box>
  )
}
