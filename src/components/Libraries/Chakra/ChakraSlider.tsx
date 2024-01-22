import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraSlider() {
  return (
    <ChakraWrapper>
      <Slider aria-label="slider-ex-1" defaultValue={30}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </ChakraWrapper>
  )
}

export const chakraSliderData: TComponentData = {
  name: 'Slider',
  library: 'chakra',
  component: <ChakraSlider />,
  tags: ['chakra', 'slider'],
  docsLink: 'https://chakra-ui.com/docs/components/slider/usage',
}
