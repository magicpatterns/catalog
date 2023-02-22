'use client'
import { Button, Heading, Box } from '@chakra-ui/react'

export default function Home() {
  return (
    <Box css={{ padding: '36px' }}>
      <Heading>Mirrorful + Chakra UI Example</Heading>
      <Button colorScheme="pink">Hello!</Button>
    </Box>
  )
}
