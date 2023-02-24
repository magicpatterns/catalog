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
  Link,
} from '@chakra-ui/react'
import { TColorData } from 'types'
import { useState } from 'react'
import { FiCheckCircle } from 'react-icons/fi'
import { CodeSnippet } from './General/CodeSnippet'
import Highlight from 'react-highlight'
import 'highlight.js/styles/atom-one-dark.css'

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
                <Text css={{ marginBottom: 8 }}>
                  <span style={{ fontWeight: 'bold' }}>1.</span> Import{' '}
                  <Code>theme.css</Code>
                </Text>
                <Highlight language="javascript" className="code-snippet">
                  {`import './.mirrorful/theme.css'`}
                </Highlight>{' '}
                <Text css={{ marginTop: 12, marginBottom: 8 }}>
                  <span style={{ fontWeight: 'bold' }}>2.</span> Your CSS
                  Variables can now be accessed anywhere in your app!
                </Text>
                <Highlight language="css" className="code-snippet">
                  {`.primary-button {\n    background-color: var(--color-primary);\n}\n\n.primary-button:hover {\n    background-color: var(--color-primary-hover);\n}`}
                </Highlight>
              </TabPanel>
              <TabPanel>
                <Text css={{ marginBottom: 8 }}>
                  <span style={{ fontWeight: 'bold' }}>1.</span> Import{' '}
                  <Code>Tokens</Code>
                </Text>

                <Highlight language="javascript" className="code-snippet">
                  {`import { Tokens } from './.mirrorful/theme'`}
                </Highlight>

                <Text css={{ marginTop: 12, marginBottom: 8 }}>
                  <span style={{ fontWeight: 'bold' }}>2.</span> Use your tokens
                  anywhere as constants!
                </Text>
                <Highlight language="javascript" className="code-snippet">
                  {`<Button\n   style={{ backgroundColor: Tokens.primary.base}}\n   _hover={{ backgroundColor: Tokens.primary.hover }}\n   _active={{ backgroundColor: Tokens.primary.active }}\n>\n   Click here\n</Button>`}
                </Highlight>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Text css={{ marginTop: '12px' }}>
            To learn more about how to import these generated files, visit our{' '}
            <Link
              isExternal
              color="blue.500"
              href="https://github.com/Mirrorful/mirrorful"
            >
              documentation here.
            </Link>
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
