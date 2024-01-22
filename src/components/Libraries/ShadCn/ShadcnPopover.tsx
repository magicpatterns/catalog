import { TComponentData } from '@/types'

import { Popover, PopoverContent, PopoverTrigger } from './raw/ui/popover'

export function ShadcnPopover() {
  return (
    <Popover>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  )
}

export const shadcnPopoverData: TComponentData = {
  name: 'Popover',
  library: 'shadcn',
  component: <ShadcnPopover />,
  tags: ['shadcn', 'popover'],
  docsLink: 'https://ui.shadcn.com/docs/components/popover',
}
