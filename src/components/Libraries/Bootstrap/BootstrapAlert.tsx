import Alert from 'react-bootstrap/Alert'

import { TComponentData } from '@/types'

export function BootstrapAlert() {
  return <Alert variant={'primary'}>Alert!</Alert>
}

export const bootstrapAlertData: TComponentData = {
  name: 'Alert',
  library: 'bootstrap',
  component: <BootstrapAlert />,
  tags: ['bootstrap', 'alert'],
  docsLink: 'https://react-bootstrap.netlify.app/docs/components/alert',
}
