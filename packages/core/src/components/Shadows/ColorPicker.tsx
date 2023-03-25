import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react'
import { RgbColor, SketchPicker } from '@hello-pangea/color-picker'
import { useState } from 'react'

import { BoxDemo } from './BoxDemo'
import { Sliders } from './Sliders'

export function ColorPicker() {
  const [color, setColor] = useState('rgba(0, 0, 0, 0.4)')

  const handleChange = (color: RgbColor) => {
    const rgba = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
    setColor(rgba)
  }

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
      <SketchPicker width="100%" onChange={(e) => handleChange(e.rgb)} />
      <Sliders />
      <BoxDemo color={color} />
    </Box>
  )
}
