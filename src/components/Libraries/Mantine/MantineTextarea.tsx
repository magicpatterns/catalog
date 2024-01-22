import { Textarea } from '@mantine/core'

import { TComponentData } from '@/types'

import { MantineWrapper } from './MantineWrapper'

export function MantineTextarea() {
  return (
    <MantineWrapper>
      <Textarea placeholder="Your comment" label="Your comment" withAsterisk />{' '}
    </MantineWrapper>
  )
}

export const mantineTextAreaData: TComponentData = {
  name: 'Textarea',
  library: 'mantine',
  component: <MantineTextarea />,
  tags: ['mantine', 'textarea', 'text', 'area', 'paragraph', 'comment'],
}
