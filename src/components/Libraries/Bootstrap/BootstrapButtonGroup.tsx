import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import { TComponentData } from '@/types'

export function BootstrapButtonGroup() {
  return (
    <ButtonGroup aria-label="Basic example">
      <Button variant="secondary">Left</Button>
      <Button variant="secondary">Middle</Button>
      <Button variant="secondary">Right</Button>
    </ButtonGroup>
  )
}

export const bootstrapButtonGroupData: TComponentData = {
  name: 'Button Group',
  library: 'bootstrap',
  component: <BootstrapButtonGroup />,
  tags: ['bootstrap', 'button', 'group'],
  docsLink: 'https://react-bootstrap.netlify.app/docs/components/button-group',
}
