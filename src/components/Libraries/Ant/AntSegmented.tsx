import { Segmented } from 'antd'

import { TComponentData } from '@/types'

export function AntSegmented() {
  return <Segmented options={['Daily', 'Weekly', 'Monthly']} />
}

export const antSegmentedData: TComponentData = {
  name: 'Segmented',
  library: 'ant',
  component: <AntSegmented />,
  tags: ['ant', 'segmented'],
  docsLink: 'https://ant.design/components/segmented',
}
