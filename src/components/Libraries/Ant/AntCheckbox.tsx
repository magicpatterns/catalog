import { Checkbox } from 'antd'

import { TComponentData } from '@/types'

export function AntCheckbox() {
  return <Checkbox>Checkbox</Checkbox>
}

export const antCheckboxData: TComponentData = {
  name: 'Checkbox',
  library: 'ant',
  component: <AntCheckbox />,
  tags: ['ant', 'checkbox', 'check'],
  docsLink: 'https://ant.design/components/checkbox',
}
