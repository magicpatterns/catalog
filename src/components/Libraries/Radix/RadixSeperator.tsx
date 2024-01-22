import { Flex, Separator, Text } from '@radix-ui/themes'

import { TComponentData } from '@/types'

import { RadixWrapper } from './RadixWrapper'

export function RadixSeperator() {
  return (
    <RadixWrapper>
      <Text size="2">
        Tools for building high-quality, accessible UI.
        <Separator my="3" size="4" />
        <Flex gap="3" align="center">
          Themes
          <Separator orientation="vertical" />
          Primitives
          <Separator orientation="vertical" />
          Icons
          <Separator orientation="vertical" />
          Colors
        </Flex>
      </Text>
    </RadixWrapper>
  )
}

export const radixSeperatorData: TComponentData = {
  name: 'Separator',
  library: 'radix',
  component: <RadixSeperator />,
  tags: ['radix', 'separator'],
  docsLink: 'https://www.radix-ui.com/themes/docs/components/separator',
}
