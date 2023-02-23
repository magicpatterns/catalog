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
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
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
          <Text css={{ marginBottom: '24px' }}>
            Your tokens can now be imported by your app.
          </Text>
          <Tabs>
            <TabList>
              <Tab>HTML / SCSS</Tab>
              <Tab>Javascript / Typescript</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Text>
                  <span style={{ fontWeight: 'bold' }}>1.</span> Import{' '}
                  <Code>theme.css</Code>
                </Text>
                <img
                  src="/import_css.png"
                  style={{ borderRadius: 8, marginTop: 8 }}
                />
                <Text css={{ marginTop: 12 }}>
                  <span style={{ fontWeight: 'bold' }}>2.</span> Your CSS
                  Variables can now be accessed anywhere in your app!
                </Text>
                <img
                  src="/css_vars_example.png"
                  style={{ borderRadius: 8, marginTop: 8 }}
                />
              </TabPanel>
              <TabPanel>
                <Text>
                  <span style={{ fontWeight: 'bold' }}>1.</span> Import{' '}
                  <Code>tokens</Code>
                  <img
                    src="/import_tokens.png"
                    style={{ borderRadius: 8, marginTop: 8 }}
                  />
                  <Text css={{ marginTop: 12 }}>
                    <span style={{ fontWeight: 'bold' }}>2.</span> Use your
                    tokens anywhere as constants!
                  </Text>
                  <img
                    src="/token_example.png"
                    style={{ borderRadius: 8, marginTop: 8 }}
                  />
                </Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
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
