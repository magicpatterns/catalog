import { Box, Heading, Text } from '@chakra-ui/react'

export function ComponentsPage() {
  return (
    <Box>
      <Heading fontSize={'2.5rem'} fontWeight="black">
        Components
      </Heading>
      <Box display="flex" justifyContent="space-between">
        <Text
          fontSize={'1.2rem'}
          fontWeight="medium"
          color="gray.600"
          css={{ marginTop: '12px' }}
        >
          {`Map colors to how they should be used within your components.`}
        </Text>
      </Box>
    </Box>
  )
}
