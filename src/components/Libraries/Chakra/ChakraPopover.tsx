import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraPopover() {
  return (
    <ChakraWrapper>
      <Popover>
        <PopoverTrigger>
          <Button>Trigger</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Confirmation!</PopoverHeader>
          <PopoverBody>
            Are you sure you want to have that milkshake?
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </ChakraWrapper>
  )
}

export const chakraPopoverData: TComponentData = {
  name: 'Popover',
  library: 'chakra',
  component: <ChakraPopover />,
  tags: ['chakra', 'popover'],
  docsLink: 'https://chakra-ui.com/docs/components/popover/usage',
}
