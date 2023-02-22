import {
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  FormControl,
  Input,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Box,
  Icon,
  Code,
} from '@chakra-ui/react'
import { TColorData } from 'types'
import { useState } from 'react'
import { FiCheckCircle } from 'react-icons/fi'

export function ExportSuccessModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Box css={{ display: 'flex', alignItems: 'center' }}>
            <Icon
              as={FiCheckCircle}
              color="green.400"
              css={{ marginRight: 8 }}
            />
            Your Tokens are Ready!
          </Box>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Your tokens can now be imported by your app. The following files
            were generated:
          </Text>
          <ul style={{ paddingLeft: '30px', marginTop: '12px' }}>
            <li>
              <Code>theme.css</Code>
            </li>
            <li>
              <Code>theme.scss</Code>
            </li>
            <li>
              <Code>theme.json</Code>
            </li>
            <li>
              <Code>theme.js</Code>
            </li>
            <li>
              <Code>theme.ts</Code>
            </li>
          </ul>
          <Text css={{ marginTop: '12px' }}>
            To learn more about how to import these generated files, visit our
            documentation here.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => {
              onClose()
            }}
            colorScheme="blue"
          >
            Done
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
