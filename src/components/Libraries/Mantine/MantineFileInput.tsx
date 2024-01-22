import { FileInput } from '@mantine/core'

import { TComponentData } from '@/types'

import { MantineWrapper } from './MantineWrapper'

export function MantineFileInput() {
  return (
    <MantineWrapper>
      <FileInput label="Your resume" withAsterisk />
    </MantineWrapper>
  )
}

export const mantineFileInputData: TComponentData = {
  name: 'File Input',
  library: 'mantine',
  component: <MantineFileInput />,
  tags: ['mantine', 'file', 'input', 'uploader'],
}
