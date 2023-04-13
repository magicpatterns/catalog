import { Box } from '@chakra-ui/react'
import { HexColorPicker } from 'react-colorful'

export function ColorPicker({
  colorPickerColor,
  onChange,
}: {
  colorPickerColor: string | undefined
  onChange: (color: string) => void
}) {
  console.log(colorPickerColor)
  return (
    <Box width="100%">
      <HexColorPicker
        style={{
          width: '100%',
        }}
        color={colorPickerColor ?? ''}
        onChange={onChange}
      />
    </Box>
  )
}
