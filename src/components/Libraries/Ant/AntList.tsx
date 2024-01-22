import { List } from 'antd'

import { TComponentData } from '@/types'

const data = ['One', 'Two', 'Three']

export function AntList() {
  return (
    <List
      dataSource={data}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
  )
}

export const antListData: TComponentData = {
  name: 'List',
  library: 'ant',
  component: <AntList />,
  tags: ['ant', 'list'],
  docsLink: 'https://ant.design/components/list',
}
