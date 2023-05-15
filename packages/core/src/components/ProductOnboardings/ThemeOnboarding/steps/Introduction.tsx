import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'

export function Introduction({
  onUpdatePage,
  onFinish,
}: {
  onUpdatePage: (newPage: number) => void
  onFinish: () => void
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
              01
            </Text>
            <Text color="gray.500" fontWeight="bold" fontSize={16}>
              of
            </Text>
            <Text color="gray.500" fontWeight="black" fontSize={16}>
              03
            </Text>
          </Stack>

          <Heading fontWeight="black" css={{ marginTop: '12px' }} fontSize={32}>
            Introducing Themes
          </Heading>
          <Text
            css={{ marginTop: '24px' }}
            fontSize={20}
            color="var(--text-color-secondary)"
            fontWeight="bold"
          >
            Define multiple themes for light/dark mode and effortlessly export
            them directly to code.
          </Text>
          <Box css={{ marginTop: '36px' }}>
            <img src="/semantic_tokens_graphic.png" />
          </Box>
        </Box>
        <Box
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '48px',
          }}
        >
          <Box />
          {/* <Button
            size="lg"
            onClick={() => {
              onUpdatePage(1)
            }}
            css={{ marginRight: '16px' }}
          >
            <ArrowBackIcon />
          </Button> */}
          <Button
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
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
