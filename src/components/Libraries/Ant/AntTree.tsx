import { Tree } from 'antd'
import type { DataNode, TreeProps } from 'antd/es/tree'

import { TComponentData } from '@/types'

const treeData: DataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: <span style={{ color: '#1677ff' }}>sss</span>,
            key: '0-0-1-0',
          },
        ],
      },
    ],
  },
]

export function AntTree() {
  return (
    <Tree
      checkable
      defaultExpandedKeys={['0-0-0', '0-0-1']}
      defaultSelectedKeys={['0-0-0', '0-0-1']}
      defaultCheckedKeys={['0-0-0', '0-0-1']}
      treeData={treeData}
    />
  )
}

export const antTreeData: TComponentData = {
  name: 'Tree',
  library: 'ant',
  component: <AntTree />,
  tags: ['ant', 'tree'],
  docsLink: 'https://ant.design/components/tree',
}
