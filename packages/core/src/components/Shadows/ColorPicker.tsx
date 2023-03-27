import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react'
import { RgbColor, SketchPicker } from '@hello-pangea/color-picker'
import { useEffect, useState } from 'react'

import { BoxDemo } from './BoxDemo'
import { Sliders } from './Sliders'

export function ColorPicker({ variant, setVariant, presetColors }) {
  const [color, setColor] = useState('rgba(49, 240, 196, 1)')

  const [hOffset, sethOffset] = useState(5)
  const [vOffset, setVOffset] = useState(5)
  const [blur, setBlur] = useState(10)
  const [spread, setSpread] = useState(0)

  const codeResult = ` ${hOffset}px ${vOffset}px ${blur}px ${spread}px ${color}`

  // const handleChange = (color: RgbColor) => {
  //   const rgba = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
  //   let nextColor = ''
  //   nextColor = rgba
  //   setColor(rgba)
  //   console.log('dkd' + codeResult)
  //   setVariant({
  //     ...variant,
  //     value: `${hOffset}px ${vOffset}px ${blur}px ${spread}px ${nextColor}`,
  //   })
  // }

  useEffect(() => {
    setVariant({ ...variant, value: codeResult })
  }, [codeResult, color, vOffset])

  console.log('colorPicker' + presetColors)
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
          color={presetColors}
          onChange={(e) => handleChange(e.rgb)}
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
              min={-20}
              max={25}
              defaultValue={hOffset}
              onChangeEnd={(val) => sethOffset(val)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text>Vertical Offset</Text>
            <Slider
              aria-label="slider-vertical-offset"
              min={-25}
              max={25}
              defaultValue={vOffset}
              onChangeEnd={(val) => setVOffset(val)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text>Blur</Text>
            <Slider
              aria-label="slider-blur"
              defaultValue={blur}
              onChangeEnd={(val) => setBlur(val)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text>Spread</Text>
            <Slider
              aria-label="slider-Spread"
              defaultValue={spread}
              onChangeEnd={(val) => setSpread(val)}
              size="lg"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text>Preview</Text>
            <div
              style={{
                boxShadow: codeResult,
                width: '100%',
                height: '100px',
                backgroundColor: '#F3F3F3',
                borderRadius: '5px',
              }}
            ></div>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
