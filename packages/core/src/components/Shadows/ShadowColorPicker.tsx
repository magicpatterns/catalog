import {
  Box,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react'
import { RgbColor, SketchPicker } from '@hello-pangea/color-picker'
import { Dispatch, SetStateAction } from 'react'

export function ShadowColorPicker({
  blur,
  spread,
  hOffset,
  vOffset,
  setBlur,
  setSpread,
  sethOffset,
  setVOffset,
  codeResult,
  handleColor,
  color,
}: {
  blur: number
  spread: number
  hOffset: number
  vOffset: number
  setBlur: Dispatch<SetStateAction<number>>
  setSpread: Dispatch<SetStateAction<number>>
  sethOffset: Dispatch<SetStateAction<number>>
  setVOffset: Dispatch<SetStateAction<number>>
  codeResult: string
  handleColor: (rgb: RgbColor) => void
  color: string
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
          onChange={(e) => handleColor(e.rgb)}
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
              onChange={(val) => sethOffset(val)}
              colorScheme="orange"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb bg="orange" />
            </Slider>
            <Text>Vertical Offset</Text>
            <Slider
              aria-label="slider-vertical-offset"
              min={-25}
              max={25}
              defaultValue={vOffset}
              onChange={(val) => setVOffset(val)}
              colorScheme="orange"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb bg="orange" />
            </Slider>
            <Text>Blur</Text>
            <Slider
              aria-label="slider-blur"
              defaultValue={blur}
              onChange={(val) => setBlur(val)}
              colorScheme="orange"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb bg="orange" />
            </Slider>
            <Text>Spread</Text>
            <Slider
              aria-label="slider-Spread"
              defaultValue={spread}
              onChange={(val) => setSpread(val)}
              size="lg"
              colorScheme="orange"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb bg="orange" />
            </Slider>
            <Text>Preview</Text>
            <Box
              style={{
                boxShadow: codeResult,
                width: '100%',
                height: '100px',
                backgroundColor: '#F3F3F3',
                borderRadius: '5px',
              }}
            ></Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
