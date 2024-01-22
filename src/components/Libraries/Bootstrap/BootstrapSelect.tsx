import Form from 'react-bootstrap/Form'

import { TComponentData } from '@/types'

export function BootstrapSelect() {
  return (
    <Form.Select>
      <option>Select Menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
  )
}

export const bootstrapSelectData: TComponentData = {
  name: 'Select',
  library: 'bootstrap',
  component: <BootstrapSelect />,
  tags: ['bootstrap', 'select'],
  docsLink: 'https://react-bootstrap.netlify.app/docs/forms/select',
}
