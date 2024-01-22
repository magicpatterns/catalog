import { TComponentData } from '@/types'

import { Switch } from './raw/ui/switch'

export function ShadcnSwitch() {
  return <Switch />
}

export const shadcnSwitchData: TComponentData = {
  name: 'Switch',
  library: 'shadcn',
  component: <ShadcnSwitch />,
  tags: ['shadcn', 'switch', 'toggle', 'on', 'off'],
  docsLink: 'https://ui.shadcn.com/docs/components/switch',
}
