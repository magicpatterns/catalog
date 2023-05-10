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
import { useEffect, useState } from 'react'

import { TokenValueInput } from './TokenValueInput'

export function EditTokenModal({
  isOpen,
  onClose,
  initialValue,
  initialPath,
  onEditToken,
}: {
  isOpen: boolean
  onClose: () => void
  initialValue?: string
  initialPath: string
  onEditToken: (token: { path: string; value: string }) => void
}) {
  const isAdding = initialValue === undefined

  const [path, setPath] = useState<string>(initialPath)
  const [tokenValue, setTokenValue] = useState<string>(initialValue ?? '')

  const handleSave = () => {
    onEditToken({
      path,
      value: tokenValue,
    })
    onClose()
  }

  useEffect(() => {
    if (!isOpen) {
      setPath(initialPath)
      setTokenValue(initialValue ?? '')
    }
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isAdding ? 'Add New Token' : 'Edit Token'}</ModalHeader>
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
