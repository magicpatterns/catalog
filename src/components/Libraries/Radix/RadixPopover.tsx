import { ChatBubbleIcon } from '@radix-ui/react-icons'
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  Popover,
  Text,
  TextArea,
} from '@radix-ui/themes'

import { TComponentData } from '@/types'

import { RadixWrapper } from './RadixWrapper'

export function RadixPopover() {
  return (
    <RadixWrapper>
      <Popover.Root>
        <Popover.Trigger>
          <Button variant="soft">
            <ChatBubbleIcon width="16" height="16" />
            Comment
          </Button>
        </Popover.Trigger>
        <Popover.Content style={{ width: 360 }}>
          <Flex gap="3">
            <Avatar
              size="2"
              src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
              fallback="A"
              radius="full"
            />
            <Box grow="1">
              <TextArea placeholder="Write a comment…" style={{ height: 80 }} />
              <Flex gap="3" mt="3" justify="between">
                <Flex align="center" gap="2" asChild>
                  <label>
                    <Checkbox />
                    <Text size="2">Send to group</Text>
                  </label>
                </Flex>

                <Popover.Close>
                  <Button size="1">Comment</Button>
                </Popover.Close>
              </Flex>
            </Box>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </RadixWrapper>
  )
}

export const radixPopoverData: TComponentData = {
  name: 'Popover',
  library: 'radix',
  component: <RadixPopover />,
  tags: ['radix', 'popover'],
  docsLink: 'https://www.radix-ui.com/themes/docs/components/popover',
}
