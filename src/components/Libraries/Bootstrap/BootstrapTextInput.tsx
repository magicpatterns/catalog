import Form from 'react-bootstrap/Form'

import { TComponentData } from '@/types'

export function BootstrapTextInput() {
  return <Form.Control />
}

export const bootstrapTextInputData: TComponentData = {
  name: 'Text Input',
  library: 'bootstrap',
  component: <BootstrapTextInput />,
  tags: ['bootstrap', 'text', 'input'],
  docsLink: 'https://react-bootstrap.netlify.app/docs/forms/form-text',
}
