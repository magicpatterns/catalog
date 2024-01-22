import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { useRef } from 'react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraAlertDialog() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<null | HTMLButtonElement>(null)

  return (
    <ChakraWrapper>
      <Button onClick={onOpen}>Open Dialog</Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              A Dialog
            </AlertDialogHeader>

            <AlertDialogBody>This is a dialog</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={onClose} ml={3}>
                Ok
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </ChakraWrapper>
  )
}

export const chakraAlertDialogData: TComponentData = {
  name: 'Alert Dialog',
  library: 'chakra',
  component: <ChakraAlertDialog />,
  tags: ['chakra', 'alert', 'dialog'],
  docsLink: 'https://chakra-ui.com/docs/components/alert-dialog/usage',
}
