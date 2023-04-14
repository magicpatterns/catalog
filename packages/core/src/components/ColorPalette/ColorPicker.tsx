import { HexColorPicker } from 'react-colorful'

interface Props {
  colorPickerColor: string
  onChange: (color: string) => void
}

export function HexPicker({ colorPickerColor, onChange }: Props) {
  return (
    <HexColorPicker
      style={{
        width: '100%',
        height: '100%',
      }}
      color={colorPickerColor}
      onChange={onChange}
    />
  )
}
