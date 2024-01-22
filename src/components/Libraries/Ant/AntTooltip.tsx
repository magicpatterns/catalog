import { Tooltip } from 'antd'

import { TComponentData } from '@/types'

export function AntTooltip() {
  return (
    <Tooltip title="Tooltip content!">
      <span>Hover me.</span>
    </Tooltip>
  )
}

export const antTooltipData: TComponentData = {
  name: 'Tooltip',
  library: 'ant',
  component: <AntTooltip />,
  tags: ['ant', 'tooltip'],
  docsLink: 'https://ant.design/components/tooltip',
}
