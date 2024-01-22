import { Menu } from 'antd'

import { TComponentData } from '@/types'

export function AntMenu() {
  return (
    <Menu
      items={[
        {
          label: 'One',
          key: 'one',
        },
        {
          label: 'Two',
          key: 'two',
        },
        {
          label: 'Three',
          key: 'three',
        },
      ]}
    />
  )
}

export const antMenuData: TComponentData = {
  name: 'Menu',
  library: 'ant',
  component: <AntMenu />,
  tags: ['ant', 'menu'],
  docsLink: 'https://ant.design/components/menu',
}
