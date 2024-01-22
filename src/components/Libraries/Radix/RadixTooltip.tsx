import { IconButton, Tooltip } from '@radix-ui/themes'
import { PlusIcon } from 'lucide-react'

import { TComponentData } from '@/types'

import { RadixWrapper } from './RadixWrapper'

export function RadixTooltip() {
  return (
    <RadixWrapper>
      <Tooltip content="Add to library">
        <IconButton radius="full">
          <PlusIcon />
        </IconButton>
      </Tooltip>
    </RadixWrapper>
  )
}

export const radixTooltipData: TComponentData = {
  name: 'Tooltip',
  library: 'radix',
  component: <RadixTooltip />,
  tags: ['radix', 'tooltip'],
  docsLink: 'https://www.radix-ui.com/themes/docs/components/tooltip',
}
