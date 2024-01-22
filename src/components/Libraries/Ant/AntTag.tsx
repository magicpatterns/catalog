import { Tag } from 'antd'

import { TComponentData } from '@/types'

export function AntTag() {
  return <Tag closeIcon>Prevent Default</Tag>
}

export const antTagData: TComponentData = {
  name: 'Tag',
  library: 'ant',
  component: <AntTag />,
  tags: ['ant', 'tag'],
  docsLink: 'https://ant.design/components/tag',
}
