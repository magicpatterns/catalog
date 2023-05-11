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
import { parseColorIntensity, parseColorOpacity } from './utils'

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
  const [hexInputValue, setHexInputValue] = useState<string>(
    tinycolor(colorPickerColor).toHexString()
  )
  const [rValue, setRValue] = useState<string>(
    `${tinycolor(colorPickerColor).toRgb().r}`
  )
  const [gValue, setGValue] = useState<string>(
    `${tinycolor(colorPickerColor).toRgb().g}`
  )
  const [bValue, setBValue] = useState<string>(
    `${tinycolor(colorPickerColor).toRgb().b}`
  )
  const [aValue, setAValue] = useState<string>(
    `${tinycolor(colorPickerColor).toRgb().a * 100}%`
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
          isDisabled={true}
          type="text"
          css={{ width: '100%', height: '100%', minHeight: '2.5rem' }}
          value={hexInputValue}
          onChange={(e) => {
            setHexInputValue(e.target.value)
            onChange(e.target.value)
          }}
        />
      )}
      {format === 'RGBA' && (
        <>
          <Input
            type="number"
            min={0}
            max={255}
            css={{
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
            }}
            value={rValue}
            onChange={(e) => setRValue(e.target.value)}
            onBlur={() => {
              const parsedRValue = parseColorIntensity(rValue)
              setRValue(`${parsedRValue}`)
              onChange(`rgba(${parsedRValue},${gValue},${bValue},${aValue})`)
            }}
          />
          <Input
            type="number"
            min={0}
            max={255}
            css={{
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
            }}
            value={gValue}
            onChange={(e) => setGValue(e.target.value)}
            onBlur={() => {
              const parsedGValue = parseColorIntensity(gValue)
              setGValue(`${parsedGValue}`)
              onChange(`rgba(${rValue},${parsedGValue},${bValue},${aValue})`)
            }}
          />
          <Input
            type="number"
            min={0}
            max={255}
            css={{
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
            }}
            value={bValue}
            onChange={(e) => setBValue(e.target.value)}
            onBlur={() => {
              const parsedBValue = parseColorIntensity(bValue)
              setBValue(`${parsedBValue}`)
              onChange(`rgba(${rValue},${gValue},${parsedBValue},${aValue})`)
            }}
          />
          <Input
            type="text"
            css={{
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
            }}
            value={aValue}
            onChange={(e) => setAValue(e.target.value)}
            onBlur={() => {
              const parsedOpacity = parseColorOpacity(
                aValue,
                tinycolor(colorPickerColor).toRgb().a
              )
              setAValue(`${parsedOpacity * 100}%`)
              onChange(`rgba(${rValue},${gValue},${bValue},${parsedOpacity})`)
            }}
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
        key={tinycolor(colorPickerColor).toString()} // To reset the state variables when format is changed
        format={format}
        onSetFormat={(format: TFormat) => onSetFormat(format)}
        onChange={onChange}
        colorPickerColor={colorPickerColor}
      />
    </Box>
  )
}
