import ProgressBar from 'react-bootstrap/ProgressBar'

import { TComponentData } from '@/types'

export function BootstrapProgressBar() {
  return (
    <div style={{ width: '150px' }}>
      <ProgressBar now={60} />
    </div>
  )
}

export const bootstrapProgressBarData: TComponentData = {
  name: 'Progress Bar',
  library: 'bootstrap',
  component: <BootstrapProgressBar />,
  tags: ['bootstrap', 'progress bar'],
  docsLink: 'https://react-bootstrap.netlify.app/docs/components/progress',
}
