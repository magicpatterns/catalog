import { Input } from 'antd'

import { TComponentData } from '@/types'

export function AntInput() {
  return <Input placeholder="Search..." />
}

export const antInputData: TComponentData = {
  name: 'Input',
  library: 'ant',
  component: <AntInput />,
  tags: ['ant', 'input', 'text field', 'form'],
  docsLink: 'https://ant.design/components/input',
}
