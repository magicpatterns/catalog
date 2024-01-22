import { Button } from '@radix-ui/themes'

import { TComponentData } from '@/types'

import { RadixWrapper } from './RadixWrapper'

export function RadixButton() {
  return (
    <RadixWrapper>
      <Button>Button</Button>
    </RadixWrapper>
  )
}

export const radixButtonData: TComponentData = {
  name: 'Button',
  library: 'radix',
  component: <RadixButton />,
  tags: ['radix', 'button'],
  docsLink: 'https://www.radix-ui.com/themes/docs/components/button',
}
