import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from '@chakra-ui/react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraRangeSlider() {
  return (
    <ChakraWrapper>
      <RangeSlider aria-label={['min', 'max']} defaultValue={[10, 30]}>
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
    </ChakraWrapper>
  )
}

export const chakraRangeSliderData: TComponentData = {
  name: 'Range Slider',
  library: 'chakra',
  component: <ChakraRangeSlider />,
  tags: ['chakra', 'range', 'slider'],
  docsLink: 'https://chakra-ui.com/docs/components/range-slider/usage',
}
