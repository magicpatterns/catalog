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
import { useState } from 'react'
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
    if (item === 'RGB') {
      onChange(colorParsed.toRgb());
    } else {
      onChange(colorParsed.toHex());
    }
  };

  const [hexColor, setHexColor] = useState<string>(colorParsed.toString());
  const [colorR, setColorR] = useState<string>(`${colorParsed.toRgb().r}`);
  const [colorG, setColorG] = useState<string>(`${colorParsed.toRgb().g}`);
  const [colorB, setColorB] = useState<string>(`${colorParsed.toRgb().b}`);
  const [colorA, setColorA] = useState<string>(`${colorParsed.toRgb().a * 100}%`);

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
          css={{ width: '65%', maxWidth: '100px' }}
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
      {type === 'HEX' && (
        <Input
          type="text"
          css={{ width: '100%', height: '100%' }}
          value={hexColor}
          onChange={(e) => setHexColor(e.target.value)}
          onBlur={() => onChange(hexColor)}
        />
      )}
      {type === 'RGB' && (
        <>
          <Input
            type="number"
            min={0}
            max={255}
            css={{ width: '20%', height: '100%', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}
            value={colorR}
            onChange={(e) => setColorR(e.target.value)}
            onBlur={() => onChange(`rgba(${colorR},${colorG},${colorB},${colorA})`)}
            placeholder="R"
          />
          <Input
            type="number"
            min={0}
            max={255}
            css={{ width: '20%', height: '100%', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}
            value={colorG}
            onChange={(e) => setColorG(e.target.value)}
            onBlur={() => onChange(`rgba(${colorR},${colorG},${colorB},${colorA})`)}
            placeholder="G"
          />
          <Input
            type="number"
            min={0}
            max={255}
            css={{ width: '20%', height: '100%', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}
            value={colorB}
            onChange={(e) => setColorB(e.target.value)}
            onBlur={() => onChange(`rgba(${colorR},${colorG},${colorB},${colorA})`)}
            placeholder="B"
          />
          <Input
            type="text"
            css={{ width: '30%', height: '100%', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}
            value={colorA}
            onChange={(e) => setColorA(e.target.value)}
            onBlur={() => onChange(`rgba(${colorR},${colorG},${colorB},${colorA})`)}
            placeholder="A"
          />
        </>
      )}
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
  if (!colorPickerColor) {
    colorPickerColor = '#000000';
  }

  const type = tinycolor(colorPickerColor).getFormat();
  return (
    <Box
      css={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        minHeight: '375px'
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
