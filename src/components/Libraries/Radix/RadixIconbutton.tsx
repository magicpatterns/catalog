import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'

import { TComponentData } from '@/types'

import { RadixWrapper } from './RadixWrapper'

export function RadixIconbutton() {
  return (
    <RadixWrapper>
      <IconButton>
        <MagnifyingGlassIcon width="18" height="18" />
      </IconButton>
    </RadixWrapper>
  )
}

export const radixIconbuttonData: TComponentData = {
  name: 'Icon Button',
  library: 'radix',
  component: <RadixIconbutton />,
  tags: ['radix', 'icon', 'button'],
  docsLink: 'https://www.radix-ui.com/themes/docs/components/icon-button',
}
