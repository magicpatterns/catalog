import {
  Box,
  Flex,
  FormLabel,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react'
import { SketchPicker } from '@hello-pangea/color-picker'
import { useState } from 'react'
import { AnyColor } from 'react-colorful/dist/types'
import tinycolor from 'tinycolor2'

import ColorPicker from '../ColorPalette/ColorPicker'

export function ShadowColorPicker({
  blur,
  spread,
  hOffset,
  vOffset,
  color,
  index,
  handleBlur,
  handleSpread,
  handleHOffset,
  handleVOffset,
  handleColor,
  codeResult,
}: {
  blur: number
  spread: number
  hOffset: number
  vOffset: number
  color: string
  index: number
  codeResult: string[]
  handleBlur: (e: number, index: number) => void
  handleSpread: (e: number, index: number) => void
  handleHOffset: (e: number, index: number) => void
  handleVOffset: (e: number, index: number) => void
  handleColor: (e: { r: number; g: number; b: number }, index: number) => void
}) {
  const INITIAL_COLOR_PICKER_COLOR = color
  const [error, setError] = useState<string>('')
  const [colorPickerColor, setColorPickerColor] = useState<AnyColor>(
    INITIAL_COLOR_PICKER_COLOR
  )

  const getColor = (color: AnyColor) => {
    return typeof color === 'string' && color.includes('#')
      ? tinycolor(color).toHexString()
      : tinycolor(color).toRgbString()
  }

  //console.log('colorPickerColor', tinycolor(colorPickerColor).toRgb())

  return (
    <Box
      sx={{
        // HACK: `<SketchPicker />`'s `style` prop does a shallow merge,
        //  so this lets us preserve the other `.sketch-picker` styles
        '.sketch-picker': {
          boxSizing: 'border-box !important',
        },
      }}
    >
      <FormLabel>Color of Shadow {index + 1}</FormLabel>

      <Flex justifyContent={'space-between'}>
        {/* <Box width="45%">
          <SketchPicker
            width="100%"
            color={color}
            onChange={(e) => {
              handleColor(e.rgb, index)
            }}
          />
        </Box> */}
        <Box width="50%">
          <ColorPicker
            onChange={(colorPickerColor) => {
              handleColor(tinycolor(colorPickerColor).toRgb(), index)
              setError('')
              if (tinycolor(colorPickerColor).isValid()) {
                const color = getColor(colorPickerColor)
                setColorPickerColor(color)
              }
            }}
            shadow={true}
            colorPickerColor={colorPickerColor}
          />
        </Box>
        <Box>
          <Text>Horizontal Offset</Text>
          <Flex>
            <Slider
              aria-label="slider-horizontal offset"
              min={-25}
              max={25}
              defaultValue={hOffset}
              onChange={(val) => {
                handleHOffset(val, index)
              }}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Input
              style={{ marginLeft: '1em' }}
              htmlSize={2}
              width="auto"
              value={hOffset}
              onChange={(e) => {
                handleHOffset(Number(e.target.value), index)
              }}
            />
          </Flex>
          <Text>Vertical Offset</Text>
          <Flex>
            <Slider
              aria-label="slider-vertical-offset"
              min={-25}
              max={25}
              defaultValue={vOffset}
              onChange={(val) => {
                handleVOffset(val, index)
              }}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Input
              style={{ marginLeft: '1em' }}
              htmlSize={2}
              width="auto"
              value={vOffset}
              onChange={(e) => {
                handleVOffset(Number(e.target.value), index)
              }}
            />
          </Flex>
          <Text>Blur</Text>
          <Flex>
            <Slider
              aria-label="slider-blur"
              defaultValue={blur}
              onChange={(val) => {
                handleBlur(val, index)
              }}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Input
              style={{ marginLeft: '1em' }}
              htmlSize={2}
              width="auto"
              value={blur}
              onChange={(e) => {
                handleBlur(Number(e.target.value), index)
              }}
            />
          </Flex>
          <Text>Spread</Text>
          <Flex>
            <Slider
              aria-label="slider-Spread"
              defaultValue={spread}
              onChange={(val) => {
                handleSpread(val, index)
              }}
              size="lg"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Input
              style={{ marginLeft: '1em' }}
              htmlSize={2}
              width="auto"
              value={spread}
              onChange={(e) => {
                handleSpread(Number(e.target.value), index)
              }}
            />
          </Flex>
          <Text style={{ marginBottom: '.5em' }}>
            Preview of Composite Shadows
          </Text>
          <Box
            style={{
              boxShadow: codeResult.toString(),
              width: '100%',
              height: '60px',
              backgroundColor: '#F3F3F3',
              borderRadius: '5px',
            }}
          ></Box>
        </Box>
        <Box
          sx={{
            // HACK: `<SketchPicker />`'s `style` prop does a shallow merge,
            //  so this lets us preserve the other `.sketch-picker` styles
            '.sketch-picker': {
              boxSizing: 'border-box !important',
            },
          }}
        ></Box>
      </Flex>
    </Box>
  )
}
