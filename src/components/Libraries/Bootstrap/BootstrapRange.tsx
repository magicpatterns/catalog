import Form from 'react-bootstrap/Form'

import { TComponentData } from '@/types'

export function BootstrapRange() {
  return (
    <div style={{ width: '300px' }}>
      <Form.Label>Range</Form.Label>
      <Form.Range />
    </div>
  )
}

export const bootstrapRangeData: TComponentData = {
  name: 'Range',
  library: 'bootstrap',
  component: <BootstrapRange />,
  tags: ['bootstrap', 'range'],
  docsLink: 'https://react-bootstrap.netlify.app/docs/forms/range',
}
