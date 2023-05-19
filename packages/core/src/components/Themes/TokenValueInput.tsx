import { Box } from '@chakra-ui/react'
import useMirrorfulStore from '@core/store/useMirrorfulStore'
import { assertToken, assertTokenGroup, TToken, TTokenGroup } from '@core/types'
import { useMemo, useState } from 'react'
import Select, {
  components,
  InputProps,
  OptionProps,
  SingleValue,
} from 'react-select'
import tinycolor from 'tinycolor2'

import ColorPicker from '../ColorPalette/ColorPicker'
import { resolveTokenValue } from './themeUtils'

type TTokenOption = {
  id: string
  path: string
  value: string
}

const getTokenOptions = (colors: TTokenGroup) => {
  const options: TTokenOption[] = []

  const checkNode = (node: TTokenGroup | TToken, currentPath: string) => {
    if (assertToken(node)) {
      options.push({
        id: node.id,
        path: currentPath,
        value: node.value,
      })
    } else if (assertTokenGroup(node)) {
      Object.keys(node).forEach((key) => {
        checkNode(
          node[key],
          currentPath.length === 0 ? key : currentPath + '.' + key
        )
      })
    }
  }

  checkNode(colors, '')

  return options.map((option) => ({ ...option, path: `{${option.path}}` }))
}

export function TokenValueInput({
  value,
  onValueChange,
}: {
  value: string
  onValueChange: (value: string) => void
}) {
  const { colors } = useMirrorfulStore()

  const [showColorPicker, setShowColorPicker] = useState<boolean>(false)
  const [colorValue, setColorValue] = useState<string>(
    resolveTokenValue({ value, colors })
  )
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<TTokenOption> | null>(null)
  const [isHover, setIsHover] = useState<boolean>(false)
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const options = useMemo(() => getTokenOptions(colors), [colors])
  let borderColor = 'var(--color-input-border)'
  if (isFocus) {
    borderColor = 'var(--color-input-border-focus)'
  } else if (isHover) {
    borderColor = 'var(--color-input-border-hover)'
  }

  return (
    <Box css={{ width: '400px' }}>
      <Box
        css={{
          display: 'flex',
          alignItems: 'center',
          border: `1px solid ${borderColor}`,
          borderRadius: 8,
          transition: 'border 200ms ease-in-out',
        }}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Box
          css={{
            width: '38px',
            height: '38px',
            backgroundColor: colorValue,
            borderRight: `1px solid ${borderColor}`,
            transition: 'border 200ms ease-in-out',
            cursor: 'pointer',
            borderTopLeftRadius: 7,
            borderBottomLeftRadius: 7,
          }}
          onClick={() => setShowColorPicker(!showColorPicker)}
        />

        <Select
          isMulti={false}
          value={selectedOption}
          inputValue={value}
          onInputChange={(inputValue, { action }) => {
            if (action === 'input-change') {
              onValueChange(inputValue)
              if (inputValue === '') {
                setSelectedOption(null)
              }
              setColorValue(inputValue)
            }
          }}
          onChange={(option) => {
            setColorValue(option ? option.value : '')
            onValueChange(option ? option.path : '')
            setSelectedOption(option)
          }}
          options={options}
          getOptionLabel={(option) => option.path}
          getOptionValue={(option) => option.path}
          components={{
            Input: CustomInput,
            Option: CustomOption,
          }}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          styles={{
            container: (styles) => ({
              ...styles,
              flexGrow: 1,
            }),
            control: (styles) => ({
              ...styles,
              outline: 'none',
              backgroundColor: 'var(--background-color-secondary)',
              boxShadow: 'none',
              border: 'none',
            }),
            input: (styles) => ({
              ...styles,
              width: '100%',
              backgroundColor: 'var(--background-color-secondary)',
              color: 'var(--text-color-primary)',
            }),
            menu: (styles) => ({
              ...styles,
              backgroundColor: 'var(--background-color-primary)',
            }),
            option: (styles, state) => ({
              ...styles,
              cursor: 'pointer',
              color: 'var(--text-color-primary)',
              backgroundColor: state.isFocused
                ? 'var(--background-color-secondary)'
                : 'var(--background-color-primary)',
            }),
          }}
        />
      </Box>
      {showColorPicker && (
        <Box>
          <ColorPicker
            colorPickerColor={colorValue}
            onChange={(color) => {
              const hex = tinycolor(color).toString()
              setColorValue(hex)
              onValueChange(hex)
            }}
          />
        </Box>
      )}
    </Box>
  )
}

function CustomInput(props: InputProps<TTokenOption, false>) {
  return <components.Input {...props} isHidden={false} />
}

function CustomOption(props: OptionProps<TTokenOption, false>) {
  return (
    <Box
      css={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: props.isFocused
          ? 'var(--background-color-secondary)'
          : 'var(--background-color-primary)',
      }}
    >
      <Box
        css={{
          marginLeft: '12px',
          padding: '12px',
          width: '25px',
          height: '25px',
          borderRadius: '50%',
          backgroundColor: props.data.value,
          border: '1px solid var(--border-color)',
        }}
      />
      <components.Option {...props} />
    </Box>
  )
}
