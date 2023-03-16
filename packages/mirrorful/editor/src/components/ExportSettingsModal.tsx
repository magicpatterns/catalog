import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  CheckboxGroup,
  SimpleGrid,
  Checkbox,
  Heading,
  VStack,
  Flex,
} from '@chakra-ui/react'
import { defaultFiles } from 'store/migrations'
import { TExportFileType } from 'types'
import { getExportFileTypeName } from 'utils/getExportFileTypeString'

type Props = {
  isOpen: boolean
  onClose: () => void
  fileTypes: TExportFileType[]
  onUpdateFileTypes: (next: TExportFileType[]) => void
}

export function ExportSettingsModal({
  isOpen,
  onClose,
  fileTypes,
  onUpdateFileTypes,
}: Props) {
  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Export Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap={3}>
            <Heading size="sm" as="label">
              File Types
            </Heading>
            <CheckboxGroup
              defaultValue={fileTypes}
              onChange={onUpdateFileTypes}
            >
              <VStack alignItems="flex-start">
                {defaultFiles.map((x) => (
                  <Checkbox key={x} value={x}>
                    {getExportFileTypeName(x)}
                  </Checkbox>
                ))}
              </VStack>
            </CheckboxGroup>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} colorScheme="blue">
            Done
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
