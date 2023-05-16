import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, Icon, Stack, Text } from '@chakra-ui/react'
import { FiArchive, FiSquare } from 'react-icons/fi'

export function Start({
  onUpdatePage,
  onStart,
}: {
  onUpdatePage: (newPage: number) => void
  onStart: (arg0: 'template' | 'scratch') => void
}) {
  return (
    <Box css={{ display: 'flex', height: '100%' }} as="form">
      <Box
        css={{
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Stack spacing={1} direction={'row'}>
            <Text color="gray.500" fontWeight="black" fontSize={16}>
              03
            </Text>
            <Text color="gray.500" fontWeight="bold" fontSize={16}>
              of
            </Text>
            <Text color="gray.500" fontWeight="black" fontSize={16}>
              03
            </Text>
          </Stack>

          <Heading fontWeight="black" css={{ marginTop: '12px' }} fontSize={32}>
            Ready?
          </Heading>
          <Text
            css={{ marginTop: '24px' }}
            fontSize={20}
            color="var(--text-color-secondary)"
            fontWeight="bold"
          >
            Get started by creating your first theme. Start from a template or
            from scratch.
          </Text>
        </Box>
        <Stack
          css={{ marginTop: '24px', display: 'flex' }}
          direction="column"
          spacing={6}
        >
          <Button
            leftIcon={<Icon as={FiArchive} />}
            size="lg"
            onClick={() => onStart('template')}
          >
            Start from a Template
          </Button>
          <Button
            leftIcon={<Icon as={FiSquare} />}
            size="lg"
            onClick={() => onStart('scratch')}
          >
            Start from Scratch
          </Button>
        </Stack>
        <Box
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '64px',
          }}
        >
          <Button
            size="lg"
            onClick={() => {
              onUpdatePage(1)
            }}
            css={{ marginRight: '16px' }}
          >
            <ArrowBackIcon />
          </Button>
          {/* <Button
            padding={'8px 36px'}
            size="lg"
            rightIcon={<ArrowForwardIcon />}
            onClick={(e) => {
              e.preventDefault()
              onUpdatePage(1)
            }}
            type="submit"
          >
            Next
          </Button> */}
        </Box>
      </Box>
    </Box>
  )
}
