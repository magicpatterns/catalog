import { TComponentData } from '@/types'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './raw/ui/collapsible'

export function ShadcnCollapsible() {
  return (
    <Collapsible>
      <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
      <CollapsibleContent>
        Yes. Free to use for personal and commercial projects. No attribution
        required.
      </CollapsibleContent>
    </Collapsible>
  )
}

export const shadcnCollapsibleData: TComponentData = {
  name: 'Collapsible',
  library: 'shadcn',
  component: <ShadcnCollapsible />,
  tags: ['shadcn', 'collapsible'],
  docsLink: 'https://ui.shadcn.com/docs/components/collapsible',
}
