import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Code,
  Flex,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
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
  useColorModeValue,
} from '@chakra-ui/react'
import { TPlatform } from '@core/components/Layout'
import { sanitizeName } from '@core/translators/sanitizeName'
import { toCjs } from '@core/translators/toCjs'
import { toCss } from '@core/translators/toCss'
import { toJs } from '@core/translators/toJs'
import { toJson } from '@core/translators/toJson'
import { toScss } from '@core/translators/toScss'
import { toTailwind } from '@core/translators/toTailwind'
import { TPrimitives } from '@core/types'
import { useState } from 'react'
import { IconType } from 'react-icons'
import { FaReact } from 'react-icons/fa'
import { FiCheckCircle } from 'react-icons/fi'
import {
  SiBootstrap,
  SiChakraui,
  SiNuxtdotjs,
  SiSvelte,
  SiTailwindcss,
} from 'react-icons/si'
import { TbBrandNextjs } from 'react-icons/tb'

import { CodePreview } from './CodePreview'
import { darkTheme, lightTheme } from './theme'

type exports = 'Colors' | 'Typography' | 'Shadows'

function PackageModalBody({ primitives }: { primitives: TPrimitives }) {
  const [exportType, setExportType] = useState<exports>('Colors')

  const exampleColorTokenName = Object.keys(primitives.colors)[0] ?? 'primary'
  const exampleFontSizeName =
    Object.keys(primitives.typography.fontSizes)[0] ?? 'sm'
  const exampleShadowName = Object.keys(primitives.shadows)[0] ?? 'sm'

  const exportTabComponent: Record<exports, React.ReactNode> = {
    Colors: (
      <TokenTab
        primaryName={exampleColorTokenName}
        cssName="color"
        cssPropertyName="background-color"
        javascriptName="colors"
        javascriptPropertyName="backgroundColor"
        tailwindName="colors"
        tailwindPropertyName="colors"
      />
    ),
    Typography: (
      <TokenTab
        primaryName={exampleFontSizeName}
        cssName="font-size"
        cssPropertyName="font-size"
        javascriptName="fontSizes"
        javascriptPropertyName="fontSize"
        tailwindName="fontSizes"
        tailwindPropertyName="fontSize"
      />
    ),
    Shadows: (
      <TokenTab
        primaryName={exampleShadowName}
        cssName="box-shadow"
        cssPropertyName="box-shadow"
        javascriptName="boxShadows"
        javascriptPropertyName="boxShadow"
        tailwindName="boxShadows"
        tailwindPropertyName="dropShadow"
      />
    ),
  }
  return (
    <>
      <Text css={{ marginBottom: '24px' }}>
        Your tokens can now be imported by your app. Open up your code editor to
        use them!
      </Text>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Previewing: {exportType}
        </MenuButton>
        <MenuList>
          <MenuOptionGroup
            defaultValue={exportType}
            type="radio"
            onChange={(e) => {
              if (typeof e === 'string') {
                setExportType(e as exports)
              }
            }}
          >
            {Object.keys(exportTabComponent).map((exportType) => {
              return (
                <MenuItemOption key={exportType} value={exportType}>
                  {exportType}
                </MenuItemOption>
              )
            })}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
      <Tabs>
        <TabPanels>{exportTabComponent[exportType]}</TabPanels>
      </Tabs>

      <Text css={{ marginTop: '12px' }}>
        To learn more about how to import these generated files, visit our{' '}
        <Link
          isExternal
          color="blue.500"
          href="https://mirrorful.com/docs/home/export-formats"
        >
          documentation
        </Link>
        .
      </Text>
      <Text css={{ marginTop: '8px' }}>
        Check out our{' '}
        <Link
          isExternal
          color="blue.500"
          href="https://mirrorful.com/docs/home/examples"
        >
          examples:
        </Link>{' '}
      </Text>
      <ExternalExamples />
    </>
  )
}

type TokenTabProps =
  | {
      primaryName: string
      cssPropertyName: 'background-color'
      cssName: 'color'
      javascriptPropertyName: 'backgroundColor'
      javascriptName: 'colors'
      tailwindPropertyName: 'colors'
      tailwindName: 'colors'
    }
  | {
      primaryName: string
      cssPropertyName: 'box-shadow'
      cssName: 'box-shadow'
      javascriptPropertyName: 'boxShadow'
      javascriptName: 'boxShadows'
      tailwindPropertyName: 'dropShadow'
      tailwindName: 'boxShadows'
    }
  | {
      primaryName: string
      cssPropertyName: 'font-size'
      cssName: 'font-size'
      javascriptPropertyName: 'fontSize'
      javascriptName: 'fontSizes'
      tailwindPropertyName: 'fontSize'
      tailwindName: 'fontSizes'
    }
  | {
      primaryName: string
      cssPropertyName: 'font-weight'
      cssName: 'font-weight'
      javascriptPropertyName: 'fontWeight'
      javascriptName: 'fontWeights'
      tailwindPropertyName: 'fontWeight'
      tailwindName: 'fontWeights'
    }
function TokenTab({
  primaryName,
  cssPropertyName,
  cssName,
  javascriptPropertyName,
  javascriptName,
  tailwindPropertyName,
  tailwindName,
}: TokenTabProps) {
  const tabs = ['CSS / SCSS', 'Javascript / Typescript', 'Tailwind'] as const
  type tokenTabs = (typeof tabs)[number]
  const tabComponents: Record<tokenTabs, React.ReactNode> = {
    'CSS / SCSS': (
      <TabPanel key="css/scss">
        <Text css={{ marginBottom: 4 }}>
          <span style={{ fontWeight: 'bold' }}>1.</span> Import{' '}
          <Code>theme.css</Code> in your <Code>App.tsx</Code> or{' '}
          <Code>index.tsx</Code> file.
        </Text>
        <Text fontSize={'sm'} css={{ marginBottom: 8 }}>
          Actual path may vary. You can reference the{' '}
          <Code fontSize="xs">.mirrorful</Code> folder in the root of your
          project.
        </Text>
        <CodePreview
          language="javascript"
          text={`import './.mirrorful/theme.css'`}
        />
        <Text css={{ marginTop: 12, marginBottom: 8 }}>
          <span style={{ fontWeight: 'bold' }}>2.</span> Your CSS Variables can
          now be accessed anywhere in your app!
        </Text>
        <CodePreview
          language="css"
          text={`.${sanitizeName(
            primaryName
          )}-button {\n    ${cssPropertyName}: var(--${cssName}-${sanitizeName(
            primaryName
          )});\n}\n\n.${sanitizeName(
            primaryName
          )}-button:hover {\n    ${cssPropertyName}: var(--${cssName}-${sanitizeName(
            primaryName
          )});\n}`}
        />
      </TabPanel>
    ),
    'Javascript / Typescript': (
      <TabPanel key="javascript/typescript">
        <Text css={{ marginBottom: 4 }}>
          <span style={{ fontWeight: 'bold' }}>1.</span> Import{' '}
          <Code>Tokens</Code> anywhere in your app.
        </Text>
        <Text fontSize="sm" css={{ marginBottom: 8 }}>
          Actual path may vary. Reference the{' '}
          <Code fontSize={'xs'}>.mirrorful</Code> folder in the root of your
          project.
        </Text>

        <CodePreview
          language="jsx"
          text={`import { Tokens } from './.mirrorful/theme'`}
        />

        <Text css={{ marginTop: 12, marginBottom: 8 }}>
          <span style={{ fontWeight: 'bold' }}>2.</span> Use your tokens
          anywhere as constants!
        </Text>
        <CodePreview
          language="jsx"
          text={`<button\n   style={{ ${javascriptPropertyName}: Tokens.${javascriptName}["${sanitizeName(
            primaryName
          )}"] }}\n> Click here\n</button>`}
        />
      </TabPanel>
    ),
    Tailwind: (
      <TabPanel key="tailwind">
        <Text css={{ marginBottom: 4 }}>
          <span style={{ fontWeight: 'bold' }}>1.</span> Import{' '}
          <Code>theme_cjs.js</Code> in <Code>tailwind.config.js</Code>{' '}
        </Text>

        <Text fontSize="sm" css={{ marginBottom: 8 }}>
          Actual path may vary. Reference the{' '}
          <Code fontSize="xs">.mirrorful</Code> folder in the root of your
          project.
        </Text>

        <CodePreview
          language="javascript"
          text={`const { Tokens } = require('./.mirrorful/theme_cjs.js')`}
        />

        <Text css={{ marginTop: 12, marginBottom: 8 }}>
          <span style={{ fontWeight: 'bold' }}>2.</span> Extend the tailwind
          theme.
        </Text>
        <CodePreview
          language="javascript"
          text={`theme: {\n    extend: { ${tailwindPropertyName}: Tokens.${tailwindName} } \n}`}
        />
      </TabPanel>
    ),
  }
  return (
    <TabPanel>
      <Tabs>
        <TabList>
          {tabs.map((tab) => {
            return <Tab key={cssName + tab}>{tab}</Tab>
          })}
        </TabList>

        <TabPanels>
          {Object.keys(tabComponents).map(
            (tab) => tabComponents[tab as tokenTabs]
          )}
        </TabPanels>
      </Tabs>
    </TabPanel>
  )
}

function WebModalBody({ primitives }: { primitives: TPrimitives }) {
  return (
    <>
      <Text css={{ marginBottom: '8px', fontSize: '1rem' }}>
        {`Copy and paste these snippets directly into your project.`}
      </Text>

      <Box css={{ marginTop: '16px' }}>
        <Tabs>
          <TabList>
            <Tab>CSS</Tab>
            <Tab>SCSS</Tab>
            <Tab>JS / Typescript</Tab>
            <Tab>JSON</Tab>
            <Tab>Tailwind</Tab>
            <Tab>Common JS</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <CodePreview
                language="css"
                text={`/* For example, create a mirrorful.css file \n and use it throughout your project */\n\n${toCss(
                  primitives
                )}`}
              />
            </TabPanel>
            <TabPanel>
              <CodePreview
                language="scss"
                text={`/* For example, create a mirrorful.scss file \n and use it throughout your project */\n\n${toScss(
                  primitives
                )}`}
              />
            </TabPanel>
            <TabPanel>
              <CodePreview
                language="js"
                text={`/* For example, create a mirrorful.js file \n and use it throughout your project */ \n\n${toJs(
                  primitives
                )}`}
              />
            </TabPanel>
            <TabPanel>
              <CodePreview
                language="json"
                text={`/* For example, create a mirrorful.json file \n and use it throughout your project */\n\n${toJson(
                  primitives
                )}`}
              />
            </TabPanel>
            <TabPanel>
              <CodePreview
                language="js"
                text={`/* Copy into the theme section of your tailwind.config.js\n Read more here: https://tailwindcss.com/docs/theme */\n\n${toTailwind(
                  primitives
                )}`}
              />
            </TabPanel>
            <TabPanel>
              <CodePreview
                language="js"
                text={`/* For example, create a mirrorful.cjs file \n and use it throughout your project. */ \n\n${toCjs(
                  primitives
                )}`}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Text css={{ marginTop: '8px' }}>
          To learn more about how to use these generated files, visit our{' '}
          <Link
            isExternal
            color="blue.500"
            href="https://mirrorful.com/docs/home/export-formats"
          >
            documentation
          </Link>
          .
        </Text>
        <Text css={{ marginTop: '8px' }}>
          Check out our{' '}
          <Link
            isExternal
            color="blue.500"
            href="https://mirrorful.com/docs/home/examples"
          >
            examples:
          </Link>
        </Text>
        <ExternalExamples />
      </Box>
    </>
  )
}

function ExternalExamples() {
  type externalExamplesNames =
    | 'React'
    | 'Next JS'
    | 'Tailwind CSS'
    | 'Chakra UI'
    | 'Nuxt 3'
    | 'SvelteKit'
    | 'Bootstrap'
    | 'Styled Components'

  const EXAMPLES_ICON_SIZE = 20
  const externalExamples: {
    name: externalExamplesNames
    link: string
    icon: React.ReactElement<IconType>
  }[] = [
    {
      name: 'React',
      link: 'https://github.com/Mirrorful/mirrorful/tree/main/examples/create-react-app',
      icon: <FaReact size={EXAMPLES_ICON_SIZE} fill={'#61DBFB'} />,
    },
    {
      name: 'Next JS',
      link: 'https://github.com/Mirrorful/mirrorful/tree/main/examples/with-chakra-ui',
      icon: <TbBrandNextjs size={EXAMPLES_ICON_SIZE} />,
    },
    {
      name: 'Styled Components',
      link: 'https://github.com/Mirrorful/mirrorful/tree/main/examples/with-styled-components',
      icon: <span>{`💅`}</span>,
    },
    {
      name: 'Tailwind CSS',
      link: 'https://github.com/Mirrorful/mirrorful/tree/main/examples/tailwind-next',
      icon: <SiTailwindcss size={EXAMPLES_ICON_SIZE} fill="#38BDF8" />,
    },
    {
      name: 'Chakra UI',
      link: 'https://github.com/Mirrorful/mirrorful/tree/main/examples/with-chakra-ui',
      icon: <SiChakraui size={EXAMPLES_ICON_SIZE} fill="#2ABFB3" />,
    },
    {
      name: 'Nuxt 3',
      link: 'https://github.com/Mirrorful/mirrorful/tree/main/examples/nuxt-3',
      icon: <SiNuxtdotjs size={EXAMPLES_ICON_SIZE} color="#00DC82" />,
    },
    {
      name: 'SvelteKit',
      link: 'https://github.com/Mirrorful/mirrorful/tree/main/examples/sveltekit',
      icon: <SiSvelte size={EXAMPLES_ICON_SIZE} color="#FF3E00" />,
    },
    {
      name: 'Bootstrap',
      link: 'https://github.com/Mirrorful/mirrorful/tree/main/examples/bootstrap-next',
      icon: <SiBootstrap size={EXAMPLES_ICON_SIZE} color="#7952b3" />,
    },
  ]
  return (
    <Flex
      css={{
        marginTop: '16px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      gap={4}
      flexWrap="wrap"
    >
      {externalExamples.map((example) => {
        return (
          <Link
            key={example.name}
            href={example.link}
            target={'_blank'}
            css={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 8,
            }}
            px="3"
            pt="1"
            pb="1"
            role="group"
            _hover={{ textDecoration: 'none', outline: '1px solid #c3cedb' }}
          >
            <Box css={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {example.icon}
              <Text fontSize={'md'}>{example.name}</Text>
            </Box>
          </Link>
        )
      })}
    </Flex>
  )
}

export function ExportSuccessModal({
  platform,
  // primaryName,
  isOpen,
  onClose,
  primitives,
}: {
  platform: TPlatform
  // primaryName: string
  isOpen: boolean
  onClose: () => void
  primitives: TPrimitives
}) {
  const backgroundColor = useColorModeValue(
    lightTheme.backgroundColors.secondary,
    darkTheme.backgroundColors.secondary
  )
  return (
    <Modal
      size="2xl"
      isOpen={isOpen}
      onClose={onClose}
      isCentered={true}
      closeOnEsc={true}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent bg={backgroundColor}>
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
          {platform === 'package' && (
            <PackageModalBody primitives={primitives} />
          )}
          {platform === 'web' && <WebModalBody primitives={primitives} />}
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
