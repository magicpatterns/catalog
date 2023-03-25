import {
  Box,
  Button,
  Code,
  Icon,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { sanitizeName } from '@core/translators/sanitizeName'
import { toCjs } from '@core/translators/toCjs'
import { toCss } from '@core/translators/toCss'
import { toJs } from '@core/translators/toJs'
import { toJson } from '@core/translators/toJson'
import { toScss } from '@core/translators/toScss'
import { TTokens } from '@core/types'
import { FiCheckCircle } from 'react-icons/fi'

import { CodePreview } from './CodePreview'
import { TPlatform } from './Dashboard'

function PackageModalBody({ tokens }: { tokens: TTokens }) {
  const outerTabs = ['Colors', 'Typography', 'Shadows']
  const innerTabs = ['CSS / SCSS', 'Javascript / Typescript', 'Tailwind']
  return (
    <>
      <Text css={{ marginBottom: '24px' }}>
        Your tokens can now be imported by your app.
      </Text>
      <Tabs>
        <TabList>
          {outerTabs.map((tab) => {
            return <Tab>{tab}</Tab>
          })}
          {/* <Tab>Colors</Tab>
          <Tab>Typography</Tab>
          <Tab>Shadows</Tab> */}
        </TabList>
        <TabPanels>
          <ColorsTab
            tabs={innerTabs}
            primaryName={
              tokens && tokens.colorData[0]
                ? tokens.colorData[0].name
                : 'primary'
            }
          />
        </TabPanels>
      </Tabs>

      <Text css={{ marginTop: '12px' }}>
        To learn more about how to import these generated files, visit our{' '}
        <Link
          isExternal
          color="blue.500"
          href="https://mirrorful.com/docs/home/export-formats"
        >
          documentation here.
        </Link>
      </Text>
      <Text css={{ marginTop: '8px' }}>
        For examples, check out our{' '}
        <Link
          isExternal
          color="blue.500"
          href="https://mirrorful.com/docs/home/examples"
        >
          examples here.
        </Link>
      </Text>
    </>
  )
}

type props = { tabs: string[]; primaryName: string }

function ColorsTab({ tabs, primaryName }: props) {
  return (
    <TabPanel>
      <Tabs>
        <TabList>
          {tabs.map((tab) => {
            return <Tab>{tab}</Tab>
          })}
        </TabList>

        <TabPanels>
          <TabPanel>
            <Text css={{ marginBottom: 8 }}>
              <span style={{ fontWeight: 'bold' }}>1.</span> Import{' '}
              <Code>theme.css</Code> (actual path may vary. You can reference
              the <Code>.mirrorful</Code> folder in the root of your project)
            </Text>
            <CodePreview
              language="javascript"
              textClass="code-snippet"
              text={`import './.mirrorful/theme.css'`}
            />
            <Text css={{ marginTop: 12, marginBottom: 8 }}>
              <span style={{ fontWeight: 'bold' }}>2.</span> Your CSS Variables
              can now be accessed anywhere in your app!
            </Text>
            <CodePreview
              language="css"
              textClass="code-snippet"
              text={`.${sanitizeName(
                primaryName
              )}-button {\n    background-color: var(--color-${sanitizeName(
                primaryName
              )});\n}\n\n.${sanitizeName(
                primaryName
              )}-button:hover {\n    background-color: var(--color-${sanitizeName(
                primaryName
              )}-300);\n}`}
            />
          </TabPanel>
          <TabPanel>
            <Text css={{ marginBottom: 8 }}>
              <span style={{ fontWeight: 'bold' }}>1.</span> Import{' '}
              <Code>Tokens</Code> (actual path may vary. You can reference the{' '}
              <Code>.mirrorful</Code> folder in the root of your project)
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
              text={`<button\n   style={{ backgroundColor: Tokens.colors.${sanitizeName(
                primaryName
              )}.base }}\n> Click here\n</button>`}
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
              <span style={{ fontWeight: 'bold' }}>2.</span> Extend the tailwind
              theme.
            </Text>
            <CodePreview
              language="javascript"
              textClass="code-snippet"
              text={`theme: {\n    extend: { colors: Tokens.colors } \n}`}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </TabPanel>
  )
}

function WebModalBody({ tokens }: { tokens: TTokens }) {
  return (
    <>
      <Text css={{ marginBottom: '8px', fontSize: '1rem' }}>
        {`Copy and paste these snippets directly into your project.`}
      </Text>
      <Text css={{ marginTop: '8px' }}>
        To learn more about how to import these generated files, visit our{' '}
        <Link
          isExternal
          color="blue.500"
          href="https://mirrorful.com/docs/home/export-formats"
        >
          documentation here.
        </Link>
      </Text>
      <Text css={{ marginTop: '8px' }}>
        For examples, check out our{' '}
        <Link
          isExternal
          color="blue.500"
          href="https://mirrorful.com/docs/home/examples"
        >
          example projects here.
        </Link>
      </Text>
      <Box css={{ marginTop: '16px' }}>
        <Tabs>
          <TabList>
            <Tab>CSS</Tab>
            <Tab>SCSS</Tab>
            <Tab>Javascript / Typescript</Tab>
            <Tab>JSON</Tab>
            <Tab>CJS</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <CodePreview
                language="css"
                textClass="code-snippet"
                text={`/* For example, copy into mirrorful.css */\n\n${toCss(
                  tokens
                )}`}
              />
            </TabPanel>
            <TabPanel>
              <CodePreview
                language="scss"
                textClass="code-snippet"
                text={`/* For example, copy into mirrorful.scss */\n\n${toScss(
                  tokens
                )}`}
              />
            </TabPanel>
            <TabPanel>
              <CodePreview
                language="javascript"
                textClass="code-snippet"
                text={`/* For example, copy into mirrorful.js */\n\n${toJs(
                  tokens
                )}`}
              />
            </TabPanel>
            <TabPanel>
              <CodePreview
                language="javascript"
                textClass="code-snippet"
                text={`/* For example, copy into mirrorful.json */\n\n${toJson(
                  tokens
                )}`}
              />
            </TabPanel>
            <TabPanel>
              <CodePreview
                language="javascript"
                textClass="code-snippet"
                text={`/* For example, copy into mirrorful.cjs */\n\n${toCjs(
                  tokens
                )}`}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  )
}

export function ExportSuccessModal({
  platform,
  primaryName,
  isOpen,
  onClose,
  tokens,
}: {
  platform: TPlatform
  primaryName: string
  isOpen: boolean
  onClose: () => void
  tokens: TTokens
}) {
  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
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
          {platform === 'package' && <PackageModalBody tokens={tokens} />}
          {platform === 'web' && <WebModalBody tokens={tokens} />}
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
