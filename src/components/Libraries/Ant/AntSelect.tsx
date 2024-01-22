import { Select } from 'antd'

import { TComponentData } from '@/types'

export function AntSelect() {
  return (
    <Select
      defaultValue="One"
      style={{ width: 120 }}
      disabled
      options={[
        { value: 'One', label: 'One' },
        { value: 'Two', label: 'Two' },
        { value: 'Three', label: 'Three' },
      ]}
    />
  )
}

export const antSelectData: TComponentData = {
  name: 'Select',
  library: 'ant',
  component: <AntSelect />,
  tags: ['ant', 'select'],
  docsLink: 'https://ant.design/components/select',
}
