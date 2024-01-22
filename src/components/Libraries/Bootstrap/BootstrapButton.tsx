import Button from 'react-bootstrap/Button'

import { TComponentData } from '@/types'

export function BootstrapButton() {
  return <Button>Button</Button>
}

export const bootstrapButtonData: TComponentData = {
  name: 'Button',
  library: 'bootstrap',
  component: <BootstrapButton />,
  tags: ['bootstrap', 'button'],
  docsLink: 'https://react-bootstrap.netlify.app/docs/components/button',
}
