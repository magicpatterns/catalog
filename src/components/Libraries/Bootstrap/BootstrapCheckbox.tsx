import Form from 'react-bootstrap/Form'

import { TComponentData } from '@/types'

export function BootstrapCheckbox() {
  return <Form.Check type={'checkbox'} label={`Checkbox`} />
}

export const bootstrapCheckboxData: TComponentData = {
  name: 'Checkbox',
  library: 'bootstrap',
  component: <BootstrapCheckbox />,
  tags: ['bootstrap', 'checkbox'],
  docsLink: 'https://react-bootstrap.netlify.app/docs/forms/checks-radios',
}
