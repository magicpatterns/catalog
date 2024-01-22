import { SearchIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraIconButton() {
  return (
    <ChakraWrapper>
      <IconButton aria-label="Search database" icon={<SearchIcon />} />{' '}
    </ChakraWrapper>
  )
}

export const chakraIconButtonData: TComponentData = {
  name: 'Icon Button',
  library: 'chakra',
  component: <ChakraIconButton />,
  tags: ['chakra', 'icon', 'button'],
  docsLink: 'https://chakra-ui.com/docs/components/icon-button/usage',
}
