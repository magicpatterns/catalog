import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Code,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { CodePreview } from '@core/components/CodePreview'
import { generateDefaultColorShades } from '@core/components/ColorPalette/utils'
import { TPlatform } from '@core/components/Dashboard'
import tinycolor from 'tinycolor2'

import { getNumberOfStepsInOnboardingFlow } from '../constants'

export function ImportInstructions({
  primaryColor,
  primaryName,
  onUpdatePage,
  platform,
}: {
  primaryColor: string
  primaryName: string
  onUpdatePage: (page: number) => void
  platform: TPlatform
}) {
  const shades = generateDefaultColorShades(primaryColor)

  return (
    <Box css={{ display: 'flex', height: '100%', flexGrow: 1 }} as="form">
      <Box
        css={{
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box css={{ paddingTop: '32px' }}>
          <Stack spacing={1} direction={'row'}>
            <Text color="gray.500" fontWeight="black" fontSize={18}>
              06
            </Text>
            <Text color="gray.500" fontWeight="bold" fontSize={18}>
              of
            </Text>
            <Text color="gray.500" fontWeight="black" fontSize={18}>
              {getNumberOfStepsInOnboardingFlow(platform)}
            </Text>
          </Stack>

          <Heading fontWeight="black" css={{ marginTop: '12px' }} fontSize={36}>
            Connecting the Dots
          </Heading>
          <Text
            css={{ marginTop: '32px' }}
            fontSize={20}
            color="gray.500"
            fontWeight="bold"
          >
            {`The last step is integrating your new theme with your app.`}
          </Text>
        </Box>
        <Box css={{ paddingBottom: '32px' }}>
          <Button
            size="lg"
            onClick={() => {
              onUpdatePage(5)
            }}
            css={{ marginRight: '16px' }}
          >
            <ArrowBackIcon />
          </Button>
          <Button
            bgColor={shades['500']}
            color={tinycolor(primaryColor).isDark() ? 'white' : 'black'}
            _hover={{
              bgColor: shades['700'],
            }}
            _active={{
              bgColor: shades['800'],
            }}
            padding={'8px 36px'}
            size="lg"
            rightIcon={<ArrowForwardIcon />}
            onClick={(e) => {
              e.preventDefault()
              onUpdatePage(7)
            }}
            type="submit"
            autoFocus
          >
            Next
          </Button>
        </Box>
      </Box>
      <Box
        css={{
          marginLeft: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
        }}
      >
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
                <Code>theme.css</Code> in your App.tsx or index.tsx file. Actual
                path may vary. You can reference the <Code>.mirrorful</Code>{' '}
                folder in the root of your project.
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
                text={`.${primaryName.toLowerCase()}-button {\n    background-color: var(--color-${primaryName.toLowerCase()});\n}\n\n.${primaryName.toLowerCase()}-button:hover {\n    background-color: var(--color-${primaryName.toLowerCase()}-hover);\n}`}
              />
            </TabPanel>
            <TabPanel>
              <Text css={{ marginBottom: 4 }}>
                <span style={{ fontWeight: 'bold' }}>1.</span> Import{' '}
                <Code>Tokens</Code> anywhere in your app.
              </Text>
              <Text fontSize="sm" css={{ marginBottom: 8 }}>
                Actual path may vary. Reference the{' '}
                <Code fontSize={'xs'}>.mirrorful</Code> folder in the root of
                your project.
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
                text={`<button\n   style={{ backgroundColor: Tokens.colors.${primaryName.toLowerCase()}.base }}\n> Click here\n</button>`}
              />
            </TabPanel>
            <TabPanel>
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
      </Box>
    </Box>
  )
}
