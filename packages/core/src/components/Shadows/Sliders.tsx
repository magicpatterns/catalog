import {
  Box,
  defineStyle,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'

export function Sliders() {
  const [inset, setInsert] = useState(false)
  const [hOffset, sethOffset] = useState('5')
  const [vOffset, setVOfset] = useState('5')
  const [blur, setBlur] = useState('10')
  const [spread, setSpread] = useState('0')

  const [color, setColor] = useState('rgba(1, 1, 1, 0.4)')

  const codeResult = `${
    inset ? 'inset' : ''
  } ${hOffset}px ${vOffset}px ${blur}px ${spread}px ${color}`
  return (
    <Box
      sx={{
        // HACK: `<SketchPicker />`'s `style` prop does a shallow merge,
        //  so this lets us preserve the other `.sketch-picker` styles
        '.sketch-picker': {
          boxSizing: 'border-box !important',
        },
      }}
    >
      <Text>Horizontal Offset</Text>
      <Slider
        aria-label="slider-"
        defaultValue={10}
        onChangeEnd={(val) => sethOffset(val)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Text>Vertical Offset</Text>
      <Slider
        aria-label="slider-horizontal-offset"
        defaultValue={10}
        onChangeEnd={(val) => setVOfset(val)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Text>Blur</Text>
      <Slider
        aria-label="slider-"
        defaultValue={10}
        onChangeEnd={(val) => console.log(val)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Text>Spread</Text>
      <Slider
        aria-label="slider-"
        defaultValue={10}
        onChangeEnd={(val) => console.log(val)}
        size="lg"
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <div
        style={{
          boxShadow: codeResult,
          width: '200px',
          height: '100px',
          backgroundColor: '#F3F3F3',
          borderRadius: '20px',
        }}
      ></div>
    </Box>
  )
}
function definePartsStyle(arg0: { container: any; track: any; thumb: any }) {
  throw new Error('Function not implemented.')
}
