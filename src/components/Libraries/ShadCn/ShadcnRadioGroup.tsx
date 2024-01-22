import { TComponentData } from '@/types'

import { Label } from './raw/ui/label'
import { RadioGroup, RadioGroupItem } from './raw/ui/radio-group'

export function ShadcnRadioGroup() {
  return (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
    </RadioGroup>
  )
}

export const shadcnRadioGroupData: TComponentData = {
  name: 'Radio Group',
  library: 'shadcn',
  component: <ShadcnRadioGroup />,
  tags: ['shadcn', 'radio', 'group'],
  docsLink: 'https://ui.shadcn.com/docs/components/radio-group',
}
