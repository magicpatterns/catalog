import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react'

import { TComponentData } from '@/types'

import { ChakraWrapper } from './ChakraWrapper'

export function ChakraEditable() {
  return (
    <ChakraWrapper>
      <Editable defaultValue="Click to edit">
        <EditablePreview />
        <EditableInput />
      </Editable>{' '}
    </ChakraWrapper>
  )
}

export const chakraEditableData: TComponentData = {
  name: 'Editable',
  library: 'chakra',
  component: <ChakraEditable />,
  tags: ['chakra', 'editable', 'text'],
  docsLink: 'https://chakra-ui.com/docs/components/editable/usage',
}
