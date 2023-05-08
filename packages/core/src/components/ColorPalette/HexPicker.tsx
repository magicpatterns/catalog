import { HexColorPicker } from 'react-colorful'
import { AnyColor } from 'react-colorful/dist/types'
import tinycolor from 'tinycolor2'

interface Props {
  colorPickerColor: AnyColor
  onChange: (color: AnyColor) => void
}

export default function HexPicker({ colorPickerColor, onChange }: Props) {
  return (
    <HexColorPicker
      style={{
        width: '100%',
        height: '100%',
      }}
      color={tinycolor(colorPickerColor).toHexString()}
      onChange={onChange}
    />
  )
}
