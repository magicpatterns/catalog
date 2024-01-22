import { TComponentData } from '@/types'

import { Alert, AlertDescription, AlertTitle } from './raw/ui/alert'
import { ShadcnWrapper } from './ShadcnWrapper'

export function ShadcnAlert() {
  return (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the cli.
      </AlertDescription>
    </Alert>
  )
}

export const shadcnAlertData: TComponentData = {
  name: 'Alert',
  library: 'shadcn',
  component: <ShadcnAlert />,
  tags: ['shadcn', 'alert', 'message', 'notification', 'feedback'],
  docsLink: 'https://ui.shadcn.com/docs/components/alert',
}
