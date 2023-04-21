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
  codeResult,
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
      <Flex justifyContent={'space-between'}>
        <Box width="45%">
          <Text style={{ marginBottom: '.5em' }}>Color</Text>
          <SketchPicker
            width="100%"
            color={color}
            onChange={(e) => {
              handleNewColor(e.rgb, index)
            }}
          />
        </Box>
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
                  handleHOffset(e.target.value, index)
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
                  handleVOffset(e.target.value, index)
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
                  handleBlur(e.target.value, index)
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
                  handleSpread(e.target.value, index)
                }}
              />
            </Flex>
            <Text style={{ marginBottom: '.5em' }}>Preview</Text>
            <Box
              style={{
                boxShadow: codeResult,
                width: '100%',
                height: '60px',
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
