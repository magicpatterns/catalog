import './Tooltipstyle.css'

import * as Ariakit from '@ariakit/react'

import { TComponentData } from '@/types'

export function AriakitTooltip() {
  const tooltip = Ariakit.useTooltipStore()
  return (
    <>
      <Ariakit.TooltipAnchor
        store={tooltip}
        className="link"
        render={<a href="https://ariakit.org/components/tooltip" />}
      >
        Tooltip
      </Ariakit.TooltipAnchor>
      <Ariakit.Tooltip store={tooltip} className="tooltip">
        https://ariakit.org/components/tooltip
      </Ariakit.Tooltip>
    </>
  )
}

export const ariakitTooltipData: TComponentData = {
  name: 'Tooltip',
  library: 'ariakit',
  component: <AriakitTooltip />,
  tags: ['ariakit', 'tooltip'],
  docsLink: 'https://ariakit.org/components/tooltip',
}
