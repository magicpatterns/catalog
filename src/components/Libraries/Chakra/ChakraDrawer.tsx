import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { useRef } from 'react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<null | HTMLButtonElement>(null)

  return (
    <ChakraWrapper>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Open Drawer
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Chakra Drawer</DrawerHeader>

          <DrawerBody>Some content</DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Ok</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </ChakraWrapper>
  )
}

export const chakraDrawerData: TComponentData = {
  name: 'Drawer',
  library: 'chakra',
  component: <ChakraDrawer />,
  tags: ['chakra', 'drawer'],
  docsLink: 'https://chakra-ui.com/docs/components/drawer/usage',
}
