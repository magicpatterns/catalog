import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useState } from 'react'

import { TokenValueInput } from './TokenValueInput'

export function EditTokenModal({
  isOpen,
  onClose,
  initialPath,
  onEditToken,
}: {
  isOpen: boolean
  onClose: () => void
  initialPath: string
  onEditToken: (token: { path: string; value: string }) => void
}) {
  const [path, setPath] = useState<string>(initialPath)
  const [tokenValue, setTokenValue] = useState<string>('')

  const handleSave = () => {
    onEditToken({
      path,
      value: tokenValue,
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Token</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          css={{
            padding: '0px 32px 32px 32px',
          }}
        >
          <FormControl>
            <FormLabel>Token Name</FormLabel>
            <Input
              placeholder="Unique name"
              value={path}
              onChange={(e) => setPath(e.target.value)}
            />
          </FormControl>
          <FormControl css={{ marginTop: '8px' }}>
            <FormLabel>Color</FormLabel>
            <TokenValueInput value={tokenValue} onValueChange={setTokenValue} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSave}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
