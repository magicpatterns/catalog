import { Spin } from 'antd'

import { TComponentData } from '@/types'

export function AntSpin() {
  return <Spin />
}

export const antSpinData: TComponentData = {
  name: 'Spin',
  library: 'ant',
  component: <AntSpin />,
  tags: ['ant', 'spin', 'spinner', 'loading', 'loader'],
  docsLink: 'https://ant.design/components/spin',
}
