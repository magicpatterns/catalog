import {
  ArrowBackIcon,
  ArrowForwardIcon,
  BellIcon,
  CheckCircleIcon,
  MoonIcon,
} from '@chakra-ui/icons'
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
import { generateDefaultColorShades } from '@core/components/ColorPalette/utils'
import { TPlatform } from '@core/components/Layout'
import tinycolor from 'tinycolor2'

import { getNumberOfStepsInOnboardingFlow } from '../constants'

export function ReviewPrimary({
  onUpdatePage,
  primaryColor,
  platform,
}: {
  onUpdatePage: (page: number) => void
  primaryColor: string
  platform: TPlatform
}) {
  const shades = generateDefaultColorShades({ primary: primaryColor })

  return (
    <Box
      css={{ display: 'flex', height: '100%' }}
      flexDirection={{
        base: 'column',
        md: 'row',
      }}
      as="form"
    >
      <Box
        width={{
          base: '100%',
          md: '50%',
        }}
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
              03
            </Text>
            <Text color="gray.500" fontWeight="bold" fontSize={18}>
              of
            </Text>
            <Text color="gray.500" fontWeight="black" fontSize={18}>
              {getNumberOfStepsInOnboardingFlow(platform)}
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
            <br />
            <br />
            This is only a preview, you can always change it later.
          </Text>
        </Box>
        <Box
          css={{ paddingBottom: '32px' }}
          position={{
            base: 'absolute',
            md: 'static',
          }}
          bottom={{
            base: '0px',
            md: 'unset',
          }}
        >
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
            onClick={(e) => {
              e.preventDefault()
              onUpdatePage(4)
            }}
            type="submit"
          >
            Next
          </Button>
        </Box>
      </Box>
      <Box
        width={{
          base: '100%',
          md: '60%',
        }}
        padding={{
          base: '0px 24px',
          md: '0px',
        }}
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Stack
          spacing={4}
          width={{
            base: '100%',
            md: 'auto',
          }}
        >
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
