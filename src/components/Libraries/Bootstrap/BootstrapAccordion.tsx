import Accordion from 'react-bootstrap/Accordion'

import { TComponentData } from '@/types'

export function BootstrapAccordion() {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Item #1</Accordion.Header>
        <Accordion.Body>Content #1</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Item #2</Accordion.Header>
        <Accordion.Body>Content #2</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export const bootstrapAccordionData: TComponentData = {
  name: 'Accordion',
  library: 'bootstrap',
  component: <BootstrapAccordion />,
  tags: ['bootstrap', 'accordion'],
  docsLink: 'https://react-bootstrap.netlify.app/docs/components/accordion',
}
