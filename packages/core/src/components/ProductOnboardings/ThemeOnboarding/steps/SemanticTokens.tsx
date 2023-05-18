import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'

export function SemanticTokens({
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
              02
            </Text>
            <Text color="gray.500" fontWeight="bold" fontSize={16}>
              of
            </Text>
            <Text color="gray.500" fontWeight="black" fontSize={16}>
              03
            </Text>
          </Stack>

          <Heading fontWeight="black" css={{ marginTop: '12px' }} fontSize={32}>
            Design Tokens
          </Heading>
          <Text
            css={{ marginTop: '24px' }}
            fontSize={20}
            color="var(--text-color-secondary)"
            fontWeight="bold"
          >
            Design tokens are a single source of truth to name and store design
            decisions for your product.
          </Text>
          <Text
            css={{ marginTop: '24px' }}
            fontSize={20}
            color="var(--text-color-secondary)"
            fontWeight="bold"
          >
            A common language between designers and developers.
          </Text>
          <Box css={{ marginTop: '36px' }}>
            <img src="/semantic_tokens_graphic.png" />
          </Box>
        </Box>
        <Box
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '24px',
          }}
        >
          <Button
            size="lg"
            onClick={() => {
              onUpdatePage(0)
            }}
            css={{ marginRight: '16px' }}
          >
            <ArrowBackIcon />
          </Button>
          <Button
            padding={'8px 36px'}
            size="lg"
            rightIcon={<ArrowForwardIcon />}
            onClick={(e) => {
              e.preventDefault()
              onUpdatePage(2)
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
