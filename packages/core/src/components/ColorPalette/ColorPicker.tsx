import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { HexColorPicker, RgbaColorPicker } from 'react-colorful'
import { AnyColor } from 'react-colorful/dist/types'
import tinycolor from 'tinycolor2'

const formats = ['HEX', 'RGB'] as const

interface Props {
  colorPickerColor: AnyColor
  onChange: ((color: AnyColor) => void)
}

function DropdownInput({ onChange, colorPickerColor }: Props) {
  const colorParsed = tinycolor(colorPickerColor);
  const type = colorParsed.getFormat().toUpperCase();
  const updateType = (item: (typeof formats)[number]) => {
    if (item === 'HEX') {
      onChange(colorParsed.toHex());
    } else {
      onChange(colorParsed.toRgb());
    }
  };

  return (
    <Box
      css={{
        display: 'flex',
        alignItems: 'center',
        columnGap: '1rem',
        marginTop: '1rem',
      }}
    >
      <Menu>
        <MenuButton
          css={{ width: '65%' }}
          as={Button}
          rightIcon={<ChevronDownIcon />}
        >
          {type}
        </MenuButton>
        <MenuList>
          {formats.map((item) => (
            <MenuItem key={item} onClick={() => updateType(item)}>
              {item}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Input
        type="text"
        css={{ width: '100%', height: '100%' }}
        value={colorParsed.toString()}
        onChange={(e) => onChange(e.target.value)}
      />
    </Box>
  )
}

function HexPicker({ colorPickerColor, onChange }: Props) {
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

function RgbaPicker({ colorPickerColor, onChange }: Props) {
  const rgbColor = tinycolor(colorPickerColor).toRgb();
  return (
    <RgbaColorPicker
      style={{
        width: '100%',
        height: '100%',
      }}
      color={rgbColor}
      onChange={onChange}
    />
  )
}

export default function ColorPicker({ colorPickerColor, onChange }: Props) {
  const type = tinycolor(colorPickerColor).getFormat();
  return (
    <Box
      css={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      }}
    >
      {type === 'hex' && (
        <HexPicker colorPickerColor={colorPickerColor} onChange={onChange} />
      )}
      {type === 'rgb' && <RgbaPicker colorPickerColor={colorPickerColor} onChange={onChange}/>}
      <DropdownInput onChange={onChange} colorPickerColor={colorPickerColor}/>
    </Box>
  )
}
