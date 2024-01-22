import { Rate } from 'antd'

import { TComponentData } from '@/types'

export function AntRate() {
  return <Rate />
}

export const antRateData: TComponentData = {
  name: 'Rate',
  library: 'ant',
  component: <AntRate />,
  tags: ['ant', 'rate', 'rating'],
  docsLink: 'https://ant.design/components/rate',
}
