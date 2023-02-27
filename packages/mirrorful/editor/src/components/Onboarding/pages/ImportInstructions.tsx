import {
  Box,
  Button,
  Heading,
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  Code,
} from '@chakra-ui/react'
import { Color, ColorResult, SketchPicker } from '@hello-pangea/color-picker'
import { generateDefaultColorShades } from 'components/ColorPalette/utils'
import { useState } from 'react'
import tinycolor from 'tinycolor2'
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'
import { NUMBER_OF_STEPS_IN_NEW_FLOW } from '../constants'
import Highlight from 'react-highlight'

export function ImportInstructions({
  primaryColor,
  onUpdatePage,
  onFinish,
}: {
  primaryColor: string
  onUpdatePage: (page: number) => void
  onFinish: () => void
}) {
  const shades = generateDefaultColorShades(primaryColor)

  return (
    <Box css={{ display: 'flex', height: '100%' }}>
      <Box
        css={{
          width: '50%',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box css={{ paddingTop: '32px' }}>
          <Stack spacing={1} direction={'row'}>
            <Text color="gray.500" fontWeight="black" fontSize={18}>
              05
            </Text>
            <Text color="gray.500" fontWeight="bold" fontSize={18}>
              of
            </Text>
            <Text color="gray.500" fontWeight="black" fontSize={18}>
              {NUMBER_OF_STEPS_IN_NEW_FLOW}
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
              onUpdatePage(4)
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
            onClick={() => {
              onFinish()
            }}
          >
            Finish
          </Button>
        </Box>
      </Box>
      <Box
        css={{
          width: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '64px',
        }}
      >
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
      </Box>
    </Box>
  )
}
