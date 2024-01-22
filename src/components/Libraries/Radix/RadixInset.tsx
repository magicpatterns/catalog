import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { Box, Card, Flex, Inset, Text } from '@radix-ui/themes'

import { TComponentData } from '@/types'

import { RadixWrapper } from './RadixWrapper'

export function RadixInset() {
  return (
    <RadixWrapper>
      <Card size="3">
        <Flex>
          <Inset side="left" mr="5">
            <Flex
              align="center"
              justify="center"
              px="7"
              style={{ background: '#24292F', height: '100%' }}
            >
              <GitHubLogoIcon color="white" height="40" width="40" />
            </Flex>
          </Inset>

          <Box style={{ maxWidth: 400 }}>
            <Text as="div" color="gray" mb="1" size="2">
              github.com
            </Text>
            <Text size="5">
              Official Node.js SDK for interacting with the AcmeCorp API.
            </Text>
          </Box>
        </Flex>
      </Card>
    </RadixWrapper>
  )
}

export const radixInsetData: TComponentData = {
  name: 'Inset',
  library: 'radix',
  component: <RadixInset />,
  tags: ['radix', 'inset'],
  docsLink: 'https://www.radix-ui.com/themes/docs/components/inset',
}
