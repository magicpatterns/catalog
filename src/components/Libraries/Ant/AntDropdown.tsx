import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'

import { TComponentData } from '@/types'

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'One',
  },
  {
    key: '2',
    label: 'Two',
  },
  {
    key: '3',
    label: 'Three',
  },
]

export function AntDropdown() {
  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>Hover me</a>
    </Dropdown>
  )
}

export const antDropdownData: TComponentData = {
  name: 'Dropdown',
  library: 'ant',
  component: <AntDropdown />,
  tags: ['ant', 'dropdown'],
  docsLink: 'https://ant.design/components/dropdown',
}
