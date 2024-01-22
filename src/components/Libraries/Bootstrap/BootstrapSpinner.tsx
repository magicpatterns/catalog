import Spinner from 'react-bootstrap/Spinner'

import { TComponentData } from '@/types'

export function BootstrapSpinner() {
  return <Spinner animation="border" />
}

export const bootstrapSpinnerData: TComponentData = {
  name: 'Spinner',
  library: 'bootstrap',
  component: <BootstrapSpinner />,
  tags: ['bootstrap', 'spinner', 'loading'],
  docsLink: 'https://react-bootstrap.netlify.app/docs/components/spinners',
}
