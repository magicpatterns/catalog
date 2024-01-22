import { Progress } from 'antd'

import { TComponentData } from '@/types'

export function AntProgress() {
  return <Progress percent={30} />
}

export const antProgressData: TComponentData = {
  name: 'Progress',
  library: 'ant',
  component: <AntProgress />,
  tags: ['ant', 'progress', 'bar', 'loading'],
  docsLink: 'https://ant.design/components/progress',
}
