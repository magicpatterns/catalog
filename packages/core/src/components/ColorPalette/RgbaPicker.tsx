import { RgbaColorPicker } from 'react-colorful'
import { AnyColor } from 'react-colorful/dist/types'
import tinycolor from 'tinycolor2'

interface Props {
  colorPickerColor: AnyColor
  onChange: (color: AnyColor) => void
}

export default function RgbaPicker({ colorPickerColor, onChange }: Props) {
  const rgbColor = tinycolor(colorPickerColor).toRgb()
  return (
    <RgbaColorPicker
      style={{
        width: '100%',
        height: '100%',
        minHeight: '250px',
      }}
      color={rgbColor}
      onChange={onChange}
    />
  )
}
