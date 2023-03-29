import {
  Box,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react'
import { TShadowData } from '@core/types'
import { RgbColor, SketchPicker } from '@hello-pangea/color-picker'
import React, { useEffect, useState } from 'react'

export function ShadowColorPicker({
  variant,
  setVariant,
  presetColor,
  initialValues = {
    hOffset: 0,
    vOffset: 0,
    blur: 0,
    spread: 0,
  },
}: {
  setVariant: React.Dispatch<React.SetStateAction<TShadowData>>
  variant: {
    name: string
    value: string
  }
  presetColor: string
  initialValues?:
    | {
        hOffset: number
        vOffset: number
        blur: number
        spread: number
      }
    | undefined
}) {
  const [color, setColor] = useState(
    presetColor ? presetColor : 'rgba(1, 1, 1, 0.4)'
  )

  const [hOffset, sethOffset] = useState(initialValues.hOffset)
  const [vOffset, setVOffset] = useState(initialValues.vOffset)
  const [blur, setBlur] = useState(initialValues.blur)
  const [spread, setSpread] = useState(initialValues.spread)

  const codeResult = ` ${hOffset}px ${vOffset}px ${blur}px ${spread}px ${color}`

  const handleColor = (color: RgbColor) => {
    const rgba = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
    setColor(rgba)
  }

  useEffect(() => {
    setVariant({
      ...variant,
      value: codeResult,
    })
  }, [codeResult, color, vOffset, hOffset, blur, spread])

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
          color={presetColor}
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
