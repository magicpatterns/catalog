import Checkbox from '@mui/material/Checkbox'

import { TComponentData } from '@/types'

export function MuiCheckbox() {
  return <Checkbox />
}

export const muiCheckboxData: TComponentData = {
  name: 'Checkbox',
  library: 'mui',
  component: <MuiCheckbox />,
  tags: ['material ui', 'mui', 'checkbox'],
}
