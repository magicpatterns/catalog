import Chip from '@mui/material/Chip'

import { TComponentData } from '@/types'

export function MuiChip() {
  return <Chip label="Chip" />
}

export const muiChipData: TComponentData = {
  name: 'Chip',
  library: 'mui',
  component: <MuiChip />,
  tags: ['material ui', 'mui', 'chip'],
  docsLink: 'https://mui.com/material-ui/react-chip/',
}
