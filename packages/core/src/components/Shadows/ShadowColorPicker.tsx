import {
  Box,
  Flex,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react'
import { SketchPicker } from '@hello-pangea/color-picker'
import { Dispatch, SetStateAction } from 'react'

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
  handleNewColor,
}: {
  blur: number
  spread: number
  hOffset: number
  vOffset: number
  setBlur: Dispatch<SetStateAction<number>>
  setSpread: Dispatch<SetStateAction<number>>
  sethOffset: Dispatch<SetStateAction<number>>
  setVOffset: Dispatch<SetStateAction<number>>
  codeResult: object
  color: string
  initialButton: number
  setColor: Dispatch<SetStateAction<string[]>>
  index: number
  handleBlur: (e: string | number, index: number) => void
  handleSpread: (e: string | number, index: number) => void
  handleHOffset: (e: string | number, index: number) => void
  handleVOffset: (e: string | number, index: number) => void
  handleNewColor: (
    e: { r: number; g: number; b: number },
    index: number
  ) => void
}) {
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
      <Flex justifyContent={'space-between'} mt="1em">
        <SketchPicker
          width="45%"
          color={color}
          onChange={(e) => {
            handleNewColor(e.rgb, index)
          }}
        />
        <Box
          width="50%"
          sx={{
            // HACK: `<SketchPicker />`'s `style` prop does a shallow merge,
            //  so this lets us preserve the other `.sketch-picker` styles
            '.sketch-picker': {
              boxSizing: 'border-box !important',
            },
          }}
        >
          <Box>
            <Text>Horizontal Offset</Text>
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
              value={hOffset}
              onChange={(e) => {
                handleHOffset(e.target.value, index)
              }}
            />
            <Text>Vertical Offset</Text>
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
              value={vOffset}
              onChange={(e) => {
                handleVOffset(e.target.value, index)
              }}
            />
            <Text>Blur</Text>
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
              value={blur}
              onChange={(e) => {
                handleBlur(e.target.value, index)
              }}
            />
            <Text>Spread</Text>
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
              value={spread}
              onChange={(e) => {
                handleSpread(e.target.value, index)
              }}
            />
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
