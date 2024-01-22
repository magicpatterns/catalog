import Form from 'react-bootstrap/Form'

import { TComponentData } from '@/types'

export function BootstrapRadio() {
  return (
    <Form>
      <Form.Check type={'radio'} label={`One`} />
      <Form.Check type={'radio'} label={`Two`} />
      <Form.Check type={'radio'} label={`Three`} />
    </Form>
  )
}

export const bootstrapRadioData: TComponentData = {
  name: 'Radio',
  library: 'bootstrap',
  component: <BootstrapRadio />,
  tags: ['bootstrap', 'radio'],
  docsLink: 'https://react-bootstrap.netlify.app/docs/forms/checks-radios',
}
