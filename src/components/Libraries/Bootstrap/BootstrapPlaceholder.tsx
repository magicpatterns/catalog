import Placeholder from 'react-bootstrap/Placeholder'

import { TComponentData } from '@/types'

export function BootstrapPlaceholder() {
  return (
    <div style={{ width: '150px', height: '20px' }}>
      <Placeholder animation="glow">
        <Placeholder xs={6} />
      </Placeholder>
    </div>
  )
}

export const bootstrapPlaceholderData: TComponentData = {
  name: 'Placeholder',
  library: 'bootstrap',
  component: <BootstrapPlaceholder />,
  tags: ['bootstrap', 'placeholder', 'skeleton'],
  docsLink: 'https://react-bootstrap.netlify.app/docs/components/placeholder',
}
