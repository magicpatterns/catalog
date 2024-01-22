import type { TabsProps } from 'antd'
import { Tabs } from 'antd'

import { TComponentData } from '@/types'

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'One',
    children: 'Pane 1',
  },
  {
    key: '2',
    label: 'Two',
    children: 'Pane 2',
  },
  {
    key: '3',
    label: 'Three',
    children: 'Pane 3',
  },
]

export function AntTabs() {
  return <Tabs defaultActiveKey="1" items={items} />
}

export const antTabsData: TComponentData = {
  name: 'Tabs',
  library: 'ant',
  component: <AntTabs />,
  tags: ['ant', 'tabs'],
  docsLink: 'https://ant.design/components/tabs',
}
