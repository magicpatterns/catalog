import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { TrashIcon } from '@radix-ui/react-icons'

import { TComponentData } from '@/types'

export function MuiTooltip() {
  return (
    <Tooltip title="Delete">
      <IconButton>
        <TrashIcon />
      </IconButton>
    </Tooltip>
  )
}

export const muiTooltipData: TComponentData = {
  name: 'Tooltip',
  library: 'mui',
  component: <MuiTooltip />,
  tags: ['material ui', 'mui', 'tooltip'],
  docsLink: 'https://mui.com/material-ui/react-tooltip/',
}
