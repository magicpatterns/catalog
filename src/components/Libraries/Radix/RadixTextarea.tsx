import { TextArea } from '@radix-ui/themes'

import { TComponentData } from '@/types'

import { RadixWrapper } from './RadixWrapper'

export function RadixTextarea() {
  return (
    <RadixWrapper>
      <TextArea placeholder="Reply to comment…" />
    </RadixWrapper>
  )
}

export const radixTextareaData: TComponentData = {
  name: 'Text Area',
  library: 'radix',
  component: <RadixTextarea />,
  tags: ['radix', 'text area', 'text', 'area'],
  docsLink: 'https://www.radix-ui.com/themes/docs/components/text-area',
}
