import {
  Avatar,
  Box,
  Flex,
  Heading,
  HoverCard,
  Link,
  Text,
} from '@radix-ui/themes'

import { TComponentData } from '@/types'

import { RadixWrapper } from './RadixWrapper'

export function RadixHovercard() {
  return (
    <RadixWrapper>
      <Text>
        Follow{' '}
        <HoverCard.Root>
          <HoverCard.Trigger>
            <Link href="https://twitter.com/radix_ui" target="_blank">
              @radix_ui
            </Link>
          </HoverCard.Trigger>
          <HoverCard.Content>
            <Flex gap="4">
              <Avatar
                size="3"
                fallback="R"
                radius="full"
                src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png"
              />
              <Box>
                <Heading size="3" as="h3">
                  Radix
                </Heading>
                <Text as="div" size="2" color="gray">
                  @radix_ui
                </Text>

                <Text as="div" size="2" style={{ maxWidth: 300 }} mt="3">
                  React components, icons, and colors for building high-quality,
                  accessible UI.
                </Text>
              </Box>
            </Flex>
          </HoverCard.Content>
        </HoverCard.Root>{' '}
        for updates.
      </Text>
    </RadixWrapper>
  )
}

export const radixHovercardData: TComponentData = {
  name: 'Hovercard',
  library: 'radix',
  component: <RadixHovercard />,
  tags: ['radix', 'hover card', 'hover'],
  docsLink: 'https://www.radix-ui.com/themes/docs/components/hover-card',
}
