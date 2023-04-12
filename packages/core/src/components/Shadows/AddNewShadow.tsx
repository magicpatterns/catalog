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
import { RgbColor, SketchPicker } from '@hello-pangea/color-picker'
import { Dispatch, SetStateAction } from 'react'

export function AddNewShadow({
  blur,
  spread,
  hOffset,
  vOffset,
  setBlur,
  setSpread,
  sethOffset,
  setVOffset,
  color,
  initialButton,
  index,
  handleBlur,
  handleSpread,
  handleHOffset,
  handleVOffset,
  handleNewColor,
}: {
  blur: any
  spread: any
  hOffset: any
  vOffset: any
  setBlur: Dispatch<SetStateAction<any>>
  setSpread: Dispatch<SetStateAction<any>>
  sethOffset: Dispatch<SetStateAction<any>>
  setVOffset: Dispatch<SetStateAction<any>>
  codeResult: string
  handleColor: (rgb: RgbColor, index: number) => void
  color: any
  initialButton: any
  setColor: any
  index: number
  handleBlur: (e: any, index: number) => void
  handleSpread: (e: any, index: number) => void
  handleHOffset: (e: any, index: number) => void
  handleVOffset: (e: any, index: number) => void
  handleNewColor: (e: any, index: number) => void
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
                const nextHoffset = [...hOffset]
                nextHoffset[initialButton] = Number(e.target.value)
                sethOffset(nextHoffset)
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
                const nextVoffset = [...vOffset]
                nextVoffset[initialButton] = Number(e.target.value)
                setVOffset(nextVoffset)
              }}
            />
            <Text>Blur</Text>
            <Slider
              aria-label="slider-blur"
              defaultValue={blur[index]}
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
                const nextBlur = [...blur]
                nextBlur[initialButton] = Number(e.target.value)
                setBlur(nextBlur)
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
                const nextSpread = [...spread]
                nextSpread[initialButton] = Number(e.target.value)
                setSpread(nextSpread)
              }}
            />
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
