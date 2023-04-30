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
import { create } from 'zustand'

const formats = ['HEX', 'RGB'] as const

interface Props {
  colorPickerColor: AnyColor
  onChange: (color: string) => void
}

interface ColorState {
  type: (typeof formats)[number]
  setType: (type: (typeof formats)[number]) => void
}

const useColorStore = create<ColorState>((set) => ({
  type: 'HEX',
  setType: (type) => set(() => ({ type })),
}))

function DropdownInput({ onChange }: { onChange: (color: string) => void }) {
  const type = useColorStore((state) => state.type)
  const setType = useColorStore((state) => state.setType)
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
            <MenuItem key={item} onClick={() => setType(item)}>
              {item}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Input
        type="text"
        css={{ width: '100%', height: '100%' }}
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

function RgbaPicker() {
  return (
    <RgbaColorPicker
      style={{
        width: '100%',
        height: '100%',
      }}
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
      {type === 'rgb' && <RgbaPicker />}
      <DropdownInput onChange={onChange} />
    </Box>
  )
}
