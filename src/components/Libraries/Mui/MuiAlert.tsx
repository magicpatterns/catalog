import Alert from '@mui/material/Alert'

import { TComponentData } from '@/types'

export function MuiAlert() {
  return <Alert severity="error">Error</Alert>
}

export const muiAlertData: TComponentData = {
  name: 'Alert',
  library: 'mui',
  component: <MuiAlert />,
  tags: ['material ui', 'mui', 'alert', 'feedback', 'message'],
  docsLink: 'https://mui.com/material-ui/react-alert/',
}
