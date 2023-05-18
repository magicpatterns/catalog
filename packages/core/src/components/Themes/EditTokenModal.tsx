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
  Text,
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
  const [error, setError] = useState<string | null>(null)

  const validateInput = () => {
    setError(null)

    if (path === '') {
      setError('Please enter a valid token name.')
      return false
    }

    const keys = path.split('.')

    if (keys.filter((key) => key === '').length > 0) {
      setError('Cannot have empty token or group name.')
      return false
    }

    if (tokenValue === '') {
      setError('Please enter a valid token value.')
      return false
    }

    return true
  }

  const handleSave = () => {
    if (!validateInput()) {
      return
    }

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
          {error && (
            <Text color="red.500" css={{ marginTop: '16px' }}>
              {error}
            </Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSave}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
