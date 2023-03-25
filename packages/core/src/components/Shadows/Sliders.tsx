import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react'

import { useState } from 'react'

export function Sliders() {
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
      <Text>Horizontal Offset</Text>
      <Slider
        aria-label="slider-"
        defaultValue={10}
        onChangeEnd={(val) => console.log(val)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Text>Vertical Offset</Text>
      <Slider
        aria-label="slider-"
        defaultValue={10}
        onChangeEnd={(val) => console.log(val)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Text>Blur</Text>
      <Slider
        aria-label="slider-"
        defaultValue={10}
        onChangeEnd={(val) => console.log(val)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Text>Spread</Text>
      <Slider
        aria-label="slider-"
        defaultValue={10}
        onChangeEnd={(val) => console.log(val)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  )
}
