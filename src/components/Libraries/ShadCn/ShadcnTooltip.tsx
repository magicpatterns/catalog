import { TComponentData } from '@/types'

import { Button } from './raw/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './raw/ui/tooltip'

export function ShadcnTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export const shadcnTooltipData: TComponentData = {
  name: 'Tooltip',
  library: 'shadcn',
  component: <ShadcnTooltip />,
  tags: ['shadcn', 'tooltip'],
  docsLink: 'https://ui.shadcn.com/docs/components/tooltip',
}
