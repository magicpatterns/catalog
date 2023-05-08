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
import { AnyColor } from 'react-colorful/dist/types'
import tinycolor from 'tinycolor2'
import { create } from 'zustand'

import HexPicker from './HexPicker'
import RgbaPicker from './RgbaPicker'

const formats = ['HEX', 'RGB'] as const

interface Props {
  colorPickerColor: AnyColor
  onChange: (color: AnyColor) => void
}

interface ColorState {
  type: (typeof formats)[number]
  setType: (type: (typeof formats)[number]) => void
}

const useColorStore = create<ColorState>((set) => ({
  type: 'HEX',
  setType: (type) => set(() => ({ type })),
}))

function DropdownInput({ onChange, colorPickerColor }: Props) {
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
          css={{ width: '65%', maxWidth: '100px' }}
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
      {type === 'HEX' && (
        <Input
          type="text"
          css={{ width: '100%', height: '100%' }}
          value={tinycolor(colorPickerColor).toString()}
          onChange={(e) => onChange(tinycolor(e.target.value).toString())}
        />
      )}
      {type === 'RGB' && (
        <>
          <Input
            type="number"
            min={0}
            max={255}
            css={{
              width: '20%',
              height: '100%',
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
            }}
            value={tinycolor(colorPickerColor).toRgb().r}
            onChange={(e) =>
              onChange(
                `rgba(${tinycolor(e.target.value).toRgb().r},${
                  tinycolor(e.target.value).toRgb().g
                },${tinycolor(e.target.value).toRgb().b},${
                  tinycolor(e.target.value).toRgb().a * 100 + '%'
                })`
              )
            }
          />
          <Input
            type="number"
            min={0}
            max={255}
            css={{
              width: '20%',
              height: '100%',
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
            }}
            value={tinycolor(colorPickerColor).toRgb().g}
            onChange={(e) =>
              onChange(
                `rgba(${tinycolor(e.target.value).toRgb().r},${
                  tinycolor(e.target.value).toRgb().g
                },${tinycolor(e.target.value).toRgb().b},${
                  tinycolor(e.target.value).toRgb().a * 100 + '%'
                })`
              )
            }
          />
          <Input
            type="number"
            min={0}
            max={255}
            css={{
              width: '20%',
              height: '100%',
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
            }}
            value={tinycolor(colorPickerColor).toRgb().b}
            onChange={(e) =>
              onChange(
                `rgba(${tinycolor(e.target.value).toRgb().r},${
                  tinycolor(e.target.value).toRgb().g
                },${tinycolor(e.target.value).toRgb().b},${
                  tinycolor(e.target.value).toRgb().a * 100 + '%'
                })`
              )
            }
          />
          <Input
            type="text"
            css={{
              width: '30%',
              height: '100%',
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
            }}
            value={tinycolor(colorPickerColor).toRgb().a * 100 + '%'}
            onChange={(e) =>
              onChange(
                `rgba(${tinycolor(e.target.value).toRgb().r},${
                  tinycolor(e.target.value).toRgb().g
                },${tinycolor(e.target.value).toRgb().b},${
                  tinycolor(e.target.value).toRgb().a * 100 + '%'
                })`
              )
            }
          />
        </>
      )}
    </Box>
  )
}

export default function ColorPicker({ colorPickerColor, onChange }: Props) {
  const type = useColorStore((state) => state.type)
  return (
    <Box
      css={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        minHeight: '375px',
      }}
    >
      {type === 'HEX' && (
        <HexPicker colorPickerColor={colorPickerColor} onChange={onChange} />
      )}
      {type === 'RGB' && (
        <RgbaPicker colorPickerColor={colorPickerColor} onChange={onChange} />
      )}
      <DropdownInput onChange={onChange} colorPickerColor={colorPickerColor} />
    </Box>
  )
}
