import {
  Badge,
  Box,
  Button,
  Code,
  Heading,
  Input,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Color, ColorResult, SketchPicker } from '@hello-pangea/color-picker'
import { generateDefaultColorShades } from '@core/components/ColorPalette/utils'
import { useState } from 'react'
import tinycolor from 'tinycolor2'
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  CheckCircleIcon,
  BellIcon,
  MoonIcon,
} from '@chakra-ui/icons'
import { NUMBER_OF_STEPS_IN_NEW_FLOW } from '../constants'

export function ReviewPrimary({
  onUpdatePage,
  primaryColor,
}: {
  onUpdatePage: (page: number) => void
  primaryColor: string
}) {
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState<string>('')

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
              03
            </Text>
            <Text color="gray.500" fontWeight="bold" fontSize={18}>
              of
            </Text>
            <Text color="gray.500" fontWeight="black" fontSize={18}>
              {NUMBER_OF_STEPS_IN_NEW_FLOW}
            </Text>
          </Stack>

          <Heading fontWeight="black" css={{ marginTop: '12px' }} fontSize={36}>
            Great Choice!
          </Heading>
          <Text
            css={{ marginTop: '32px' }}
            fontSize={20}
            color="gray.500"
            fontWeight="bold"
          >
            {`Here's a quick little preview of what your primary color looks like in action.`}
          </Text>
        </Box>
        <Box css={{ paddingBottom: '32px' }}>
          <Button
            size="lg"
            onClick={() => {
              onUpdatePage(2)
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
              onUpdatePage(4)
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
      <Box
        css={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '64px 32px',
        }}
      >
        <Stack spacing={4}>
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
          >
            Button
          </Button>
          <Input focusBorderColor={primaryColor} placeholder="Input" />
          <Badge color={primaryColor}>Primary Color</Badge>
          <Heading fontWeight="bold" color={primaryColor}>
            A Heading
          </Heading>
          <Text color={primaryColor}>Some Text</Text>
          <Spinner color={primaryColor} />
          <Stack direction="row">
            <CheckCircleIcon color={primaryColor} width={8} height={8} />
            <BellIcon color={primaryColor} width={8} height={8} />
            <MoonIcon color={primaryColor} width={8} height={8} />
          </Stack>
          <Box>
            <Code color={primaryColor}>Code Snippet</Code>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
