import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { generateDefaultColorShades } from '@core/components/ColorPalette/utils'
import { TPlatform } from '@core/components/Layout'
import { ColorResult, SketchPicker } from '@hello-pangea/color-picker'
import tinycolor from 'tinycolor2'

import { getNumberOfStepsInOnboardingFlow } from '../constants'

export function PickPrimary({
  primaryColor,
  onUpdatePage,
  onUpdatePrimaryColor,
  platform,
}: {
  primaryColor: string
  onUpdatePage: (page: number) => void
  onUpdatePrimaryColor: (newColor: string) => void
  platform: TPlatform
}) {
  const shades = generateDefaultColorShades(primaryColor)

  return (
    <Box css={{ display: 'flex', height: '100%', color: 'black' }} as="form">
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
              01
            </Text>
            <Text color="gray.500" fontWeight="bold" fontSize={18}>
              of
            </Text>
            <Text color="gray.500" fontWeight="black" fontSize={18}>
              {getNumberOfStepsInOnboardingFlow(platform)}
            </Text>
          </Stack>

          <Heading fontWeight="black" css={{ marginTop: '12px' }} fontSize={36}>
            Pick a Primary color, <br /> any color.
          </Heading>
          <Text
            css={{ marginTop: '32px' }}
            fontSize={20}
            color="gray.500"
            fontWeight="bold"
          >
            This will be the main color of your theme. You can change it later.
          </Text>
        </Box>
        <Box css={{ paddingBottom: '32px' }}>
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
              onUpdatePrimaryColor(primaryColor)
              onUpdatePage(2)
            }}
            type="submit"
          >
            Next
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
        <SketchPicker
          width="100%"
          color={primaryColor}
          onChange={(color: ColorResult) => {
            onUpdatePrimaryColor(color.hex)
          }}
        />
      </Box>
    </Box>
  )
}
