import {
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { TExportFileType } from '@core/types'
import { getExportFileTypeName } from '@core/utils/getExportFileTypeString'

import { darkTheme, lightTheme } from './theme'

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
  const backgroundColor = useColorModeValue(
    lightTheme.backgroundColors.secondary,
    darkTheme.backgroundColors.secondary
  )
  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={backgroundColor}>
        <ModalHeader>Export Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap={3}>
            <Heading size="sm">File Types</Heading>
            <CheckboxGroup
              defaultValue={fileTypes}
              onChange={onUpdateFileTypes}
            >
              <VStack alignItems="flex-start">
                {['css', 'scss', 'js', 'cjs', 'ts', 'json'].map((x) => (
                  <Checkbox
                    key={x}
                    value={x}
                    defaultChecked={true}
                    colorScheme="purple"
                  >
                    {getExportFileTypeName(x as TExportFileType)}
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
