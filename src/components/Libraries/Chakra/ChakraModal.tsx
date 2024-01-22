import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <ChakraWrapper>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Some Content</ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraWrapper>
  )
}

export const chakraModalData: TComponentData = {
  name: 'Modal',
  library: 'chakra',
  component: <ChakraModal />,
  tags: ['chakra', 'modal'],
  docsLink: 'https://chakra-ui.com/docs/components/modal/usage',
}
