import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { Color, ColorResult, SketchPicker } from '@hello-pangea/color-picker'
import { generateDefaultColorShades } from '@core/components/ColorPalette/utils'
import { useState } from 'react'
import tinycolor from 'tinycolor2'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { NUMBER_OF_STEPS_IN_NEW_FLOW } from '../constants'

export function PickPrimary({
  initialPrimary,
  onUpdatePage,
  onUpdatePrimaryColor,
}: {
  initialPrimary: string
  onUpdatePage: (page: number) => void
  onUpdatePrimaryColor: (newColor: string) => void
}) {
  const [primaryColor, setPrimaryColor] = useState<string>(initialPrimary)

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
              01
            </Text>
            <Text color="gray.500" fontWeight="bold" fontSize={18}>
              of
            </Text>
            <Text color="gray.500" fontWeight="black" fontSize={18}>
              {NUMBER_OF_STEPS_IN_NEW_FLOW}
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
            onClick={() => {
              onUpdatePrimaryColor(primaryColor)
              onUpdatePage(2)
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
          justifyContent: 'center',
          alignItems: 'center',
          padding: '64px',
        }}
      >
        <SketchPicker
          width="100%"
          color={primaryColor}
          onChange={(color: ColorResult) => {
            setPrimaryColor(color.hex)
          }}
        />
      </Box>
    </Box>
  )
}
