import './Checkboxstyle.css'

import { Checkbox } from '@ariakit/react'

import { TComponentData } from '@/types'

export function AriakitCheckbox() {
  return (
    <label className="label">
      <Checkbox className="checkbox" /> I have read and agree to the terms and
      conditions
    </label>
  )
}

export const ariakitCheckboxData: TComponentData = {
  name: 'Checkbox',
  library: 'ariakit',
  component: <AriakitCheckbox />,
  tags: ['ariakit', 'checkbox', 'check', 'box'],
  docsLink: 'https://ariakit.org/components/checkbox',
}
