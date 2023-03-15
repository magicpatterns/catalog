import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
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
import { FiCheckCircle } from 'react-icons/fi'
import 'highlight.js/styles/atom-one-dark.css'
import { CodePreview } from './CodePreview'

export function ExportSuccessModal({
  primaryName,
  isOpen,
  onClose,
}: {
  primaryName: string
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose}>
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
              <Tab>CSS / SCSS</Tab>
              <Tab>Javascript / Typescript</Tab>
              <Tab>Tailwind</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Text css={{ marginBottom: 8 }}>
                  <span style={{ fontWeight: 'bold' }}>1.</span> Import{' '}
                  <Code>theme.css</Code> (actual path may vary. You can
                  reference the <Code>.mirrorful</Code> folder in the root of
                  your project)
                </Text>
                <CodePreview
                  language="javascript"
                  textClass="code-snippet"
                  text={`import './.mirrorful/theme.css'`}
                />
                <Text css={{ marginTop: 12, marginBottom: 8 }}>
                  <span style={{ fontWeight: 'bold' }}>2.</span> Your CSS
                  Variables can now be accessed anywhere in your app!
                </Text>
                <CodePreview
                  language="css"
                  textClass="code-snippet"
                  text={`.${primaryName}-button {\n    background-color: var(--color-${primaryName});\n}\n\n.${primaryName}-button:hover {\n    background-color: var(--color-${primaryName}-hover);\n}`}
                />
              </TabPanel>
              <TabPanel>
                <Text css={{ marginBottom: 8 }}>
                  <span style={{ fontWeight: 'bold' }}>1.</span> Import{' '}
                  <Code>Tokens</Code> (actual path may vary. You can reference
                  the <Code>.mirrorful</Code> folder in the root of your
                  project)
                </Text>

                <CodePreview
                  language="javascript"
                  textClass="code-snippet"
                  text={`import { Tokens } from './.mirrorful/theme'`}
                />

                <Text css={{ marginTop: 12, marginBottom: 8 }}>
                  <span style={{ fontWeight: 'bold' }}>2.</span> Use your tokens
                  anywhere as constants!
                </Text>
                <CodePreview
                  language="javascript"
                  textClass="code-snippet"
                  text={`<button\n   style={{ backgroundColor: Tokens.${primaryName}.base}}\n> Click here\n</button>`}
                />
              </TabPanel>
              <TabPanel>
                <Text css={{ marginBottom: 8 }}>
                  <span style={{ fontWeight: 'bold' }}>1.</span> Import{' '}
                  <Code>theme_cjs.js</Code> in <Code>tailwind.config.js</Code>{' '}
                  (actual path may vary. You can reference the{' '}
                  <Code>.mirrorful</Code> folder in the root of your project)
                </Text>

                <CodePreview
                  language="javascript"
                  textClass="code-snippet"
                  text={`const { Tokens } = require('./.mirrorful/theme_cjs.js')`}
                />

                <Text css={{ marginTop: 12, marginBottom: 8 }}>
                  <span style={{ fontWeight: 'bold' }}>2.</span> Extend the
                  tailwind theme.
                </Text>
                <CodePreview
                  language="javascript"
                  textClass="code-snippet"
                  text={`theme: {\n    extend: { colors: Tokens.colors } \n}`}
                />
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
