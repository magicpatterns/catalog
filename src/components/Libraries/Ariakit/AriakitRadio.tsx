import './Radiostyle.css'

import * as Ariakit from '@ariakit/react'

import { TComponentData } from '@/types'

export function AriakitRadio() {
  const radio = Ariakit.useRadioStore()
  return (
    <Ariakit.RadioGroup store={radio}>
      <label className="label">
        <Ariakit.Radio className="radio" value="apple" />
        apple
      </label>
      <label className="label">
        <Ariakit.Radio className="radio" value="orange" />
        orange
      </label>
      <label className="label">
        <Ariakit.Radio className="radio" value="watermelon" />
        watermelon
      </label>
    </Ariakit.RadioGroup>
  )
}

export const ariakitRadioData: TComponentData = {
  name: 'Radio',
  library: 'ariakit',
  component: <AriakitRadio />,
  tags: ['ariakit', 'radio'],
  docsLink: 'https://ariakit.org/components/radio',
}
