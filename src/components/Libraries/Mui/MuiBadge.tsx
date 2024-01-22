import Badge from '@mui/material/Badge'
import { EnvelopeClosedIcon } from '@radix-ui/react-icons'

import { TComponentData } from '@/types'

export function MuiBadge() {
  return (
    <Badge badgeContent={4} color="primary">
      <EnvelopeClosedIcon />
    </Badge>
  )
}

export const muiBadgeData: TComponentData = {
  name: 'Badge',
  library: 'mui',
  component: <MuiBadge />,
  tags: ['material ui', 'mui', 'badge'],
  docsLink: 'https://mui.com/material-ui/react-badge/',
}
