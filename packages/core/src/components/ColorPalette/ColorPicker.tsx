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
import { useEffect, useState } from 'react'
import { AnyColor } from 'react-colorful/dist/types'
import tinycolor from 'tinycolor2'

import HexPicker from './HexPicker'
import RgbaPicker from './RgbaPicker'
import { parseHexString } from './utils'

const formats = ['HEX', 'RGBA'] as const
type TFormat = 'HEX' | 'RGBA'

interface Props {
  colorPickerColor: AnyColor
  onChange: (color: AnyColor) => void
}

function DropdownInput({
  onChange,
  colorPickerColor,
  format,
  onSetFormat,
}: {
  colorPickerColor: AnyColor
  onChange: (color: AnyColor) => void
  format: TFormat
  onSetFormat: (format: TFormat) => void
}) {
  const getRgbaFormat = (val: string) =>
    `rgba(${tinycolor(val).toRgb().r},${tinycolor(val).toRgb().g},${
      tinycolor(val).toRgb().b
    },${Math.round(tinycolor(val).toRgb().a * 100) + '%'})`

  const [hexInputValue, setHexInputValue] = useState<string>(
    tinycolor(colorPickerColor).toHexString()
  )

  useEffect(() => {
    setHexInputValue(tinycolor(colorPickerColor).toHexString())
  }, [colorPickerColor])

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
          css={{ minWidth: '100px' }}
          as={Button}
          rightIcon={<ChevronDownIcon />}
        >
          {format}
        </MenuButton>
        <MenuList>
          {formats.map((item) => (
            <MenuItem key={item} onClick={() => onSetFormat(item)}>
              {item}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      {format === 'HEX' && (
        <Input
          type="text"
          css={{ width: '100%', height: '100%', minHeight: '2.5rem' }}
          value={hexInputValue}
          onChange={(e) => {
            setHexInputValue(e.target.value)
          }}
          onBlur={() => {
            /* Since the user may not have entered a valid hexcolor string, we parse it to convert it to a valid hexcolor string */
            const parsedHexString = parseHexString(
              hexInputValue,
              tinycolor(colorPickerColor).toHexString()
            )
            setHexInputValue(parsedHexString)
            onChange(parsedHexString)
          }}
        />
      )}
      {format === 'RGBA' && (
        <>
          <Input
            isDisabled={true}
            type="number"
            min={0}
            max={255}
            css={{
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
            }}
            value={tinycolor(colorPickerColor).toRgb().r}
            onChange={(e) => onChange(`rgba(${getRgbaFormat(e.target.value)})`)}
          />
          <Input
            isDisabled={true}
            type="number"
            min={0}
            max={255}
            css={{
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
            }}
            value={tinycolor(colorPickerColor).toRgb().g}
            onChange={(e) => onChange(`rgba(${getRgbaFormat(e.target.value)})`)}
          />
          <Input
            isDisabled={true}
            type="number"
            min={0}
            max={255}
            css={{
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
            }}
            value={tinycolor(colorPickerColor).toRgb().b}
            onChange={(e) => onChange(`rgba(${getRgbaFormat(e.target.value)})`)}
          />
          <Input
            isDisabled={true}
            type="text"
            css={{
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
            }}
            value={
              Math.round(tinycolor(colorPickerColor).toRgb().a * 100) + '%'
            }
            onChange={(e) => onChange(`rgba(${getRgbaFormat(e.target.value)})`)}
          />
        </>
      )}
    </Box>
  )
}

export default function ColorPicker({ colorPickerColor, onChange }: Props) {
  const initialFormat =
    typeof colorPickerColor === 'string' && colorPickerColor.includes('#')
      ? 'HEX'
      : 'RGBA'
  const [format, setFormat] = useState<TFormat>(initialFormat)

  const onSetFormat = (format: TFormat) => {
    if (format === 'HEX') {
      onChange(tinycolor(colorPickerColor).toHexString())
      setFormat('HEX')
    } else {
      onChange(tinycolor(colorPickerColor).toRgbString())
      setFormat('RGBA')
    }
  }
  return (
    <Box
      css={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      {format === 'HEX' && (
        <HexPicker colorPickerColor={colorPickerColor} onChange={onChange} />
      )}
      {format === 'RGBA' && (
        <RgbaPicker colorPickerColor={colorPickerColor} onChange={onChange} />
      )}
      <DropdownInput
        format={format}
        onSetFormat={(format: TFormat) => onSetFormat(format)}
        onChange={onChange}
        colorPickerColor={colorPickerColor}
      />
    </Box>
  )
}
