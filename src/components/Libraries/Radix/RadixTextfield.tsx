import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { TextField } from '@radix-ui/themes'

import { TComponentData } from '@/types'

import { RadixWrapper } from './RadixWrapper'

export function RadixTextfield() {
  return (
    <RadixWrapper>
      <TextField.Root>
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input placeholder="Search the docs…" />
      </TextField.Root>
    </RadixWrapper>
  )
}

export const radixTextfieldData: TComponentData = {
  name: 'Text Field',
  library: 'radix',
  component: <RadixTextfield />,
  tags: ['radix', 'text', 'field'],
  docsLink: 'https://www.radix-ui.com/themes/docs/components/text-field',
}
