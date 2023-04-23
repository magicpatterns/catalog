'use client'
import {
  Button,
  Heading,
  Box,
  Flex,
  Input,
  Spinner,
  Badge,
  Stack,
  Code,
  Text,
} from '@chakra-ui/react'
import {
  CheckCircleIcon,
  AddIcon,
  WarningIcon,
  BellIcon,
  MoonIcon,
} from '@chakra-ui/icons'

export default function Home() {
  return (
    <Box css={{ padding: '36px' }}>
      <Box css={{ padding: '24px' }}>
        <Heading css={{ marginBottom: '24px' }}>
          Mirrorful + Chakra UI Example
        </Heading>
        <Text css={{ marginBottom: '24px' }} fontSize="16" fontWeight="medium">
          Open your Mirrorful editor (<Code>npx mirrorful editor</Code>) to make
          live changes!
        </Text>
        <Stack spacing={8} direction="row">
          {['pink', 'green', 'teal'].map((color) => (
            <Stack key="color" direction="column" spacing={4}>
              <Text>
                Color Scheme:{' '}
                <span style={{ fontWeight: 'bold' }}>{color}</span>
              </Text>
              <Button colorScheme={color}>Button</Button>
              <Spinner color={`${color}.400`} />
              <Badge colorScheme={color}>BADGE</Badge>
              <Stack direction="row">
                <CheckCircleIcon color={`${color}.400`} />
                <BellIcon color={`${color}.400`} />
                <MoonIcon color={`${color}.400`} />
              </Stack>
              <Box>
                <Code color={`${color}.400`}>Code Snippet</Code>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
