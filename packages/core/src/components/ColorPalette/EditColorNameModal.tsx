import {
  Box,
  Button,
  Flex,
  FormControl,
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
import { TNamedToken } from '@core/types'
import { useState } from 'react'

export function EditColorNameModal({
  isOpen,
  onClose,
  initialColorName,
  onUpdateColorName,
  defaultNamedToken,
  isErrorOnUpdateColorName,
}: {
  isErrorOnUpdateColorName: (newName: string) => string | null
  defaultNamedToken: TNamedToken
  isOpen: boolean
  onClose: () => void
  initialColorName: string
  onUpdateColorName: (newName: string) => void
}) {
  const [colorName, setColorName] = useState<string>(initialColorName)
  const [isError, setIsError] = useState<string | null>(null)

  const handleSave = () => {
    const error = isErrorOnUpdateColorName(colorName)
    if (error) {
      setIsError(error)
      return
    }
    setIsError(null)
    onUpdateColorName(colorName)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Color Name</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          css={{
            flexDirection: 'row',
            display: 'flex',
            padding: '0px 32px 32px 32px',
          }}
        >
          <FormControl>
            <Flex alignItems={'center'} mb="2">
              <Text style={{ fontWeight: 500 }}>Color Name</Text>
              <Box
                css={{
                  width: '1rem',
                  height: '1rem',
                  backgroundColor: defaultNamedToken.token.value,
                  marginLeft: '10px',
                  border: '1px solid black',
                  borderRadius: '20%',
                }}
              />
            </Flex>
            <Input
              isInvalid={isError ? true : false}
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        {isError && (
          <Text color="red.500" css={{ padding: '0px 32px 0 32px' }}>
            {isError}
          </Text>
        )}
        <ModalFooter>
          <Button onClick={handleSave}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
