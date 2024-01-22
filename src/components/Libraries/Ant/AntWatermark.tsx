import { Watermark } from 'antd'

import { TComponentData } from '@/types'

export function AntWatermark() {
  return (
    <Watermark content="Ant Design">
      <div style={{ height: 100 }} />
    </Watermark>
  )
}

export const antWatermarkData: TComponentData = {
  name: 'Watermark',
  library: 'ant',
  component: <AntWatermark />,
  tags: ['ant', 'watermark'],
  docsLink: 'https://ant.design/components/watermark',
}
