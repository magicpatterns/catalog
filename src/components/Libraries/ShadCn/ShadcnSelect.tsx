import { TComponentData } from '@/types'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './raw/ui/select'

export function ShadcnSelect() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  )
}

export const shadcnSelectData: TComponentData = {
  name: 'Select',
  library: 'shadcn',
  component: <ShadcnSelect />,
  tags: ['shadcn', 'select'],
  docsLink: 'https://ui.shadcn.com/docs/components/select',
}
