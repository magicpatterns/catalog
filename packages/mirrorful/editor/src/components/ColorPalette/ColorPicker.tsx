import React from 'react'
import { Color, ColorResult, SketchPicker } from '@hello-pangea/color-picker'
import { Box } from '@chakra-ui/react'

export function ColorPicker({
  colorPickerColor,
  onChange,
  presetColors,
}: {
  presetColors: string[]
  colorPickerColor: Color
  onChange: (colorPickerColor: ColorResult, event: any) => void
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
      <SketchPicker
        width="100%"
        color={colorPickerColor}
        onChange={onChange}
        disableAlpha
        presetColors={presetColors}
      />
    </Box>
  )
}
