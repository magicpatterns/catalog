import './buttonstyle.css'

import { Button } from '@ariakit/react'

import { TComponentData } from '@/types'

export function AriakitButton() {
  return <Button className="button">Button</Button>
}

export const ariaKitButtonData: TComponentData = {
  name: 'Button',
  library: 'ariakit',
  component: <AriakitButton />,
  tags: ['ariakit', 'button'],
  docsLink: 'https://ariakit.org/components/button',
}
