import Switch from '@mui/material/Switch'

import { TComponentData } from '@/types'

export function MuiSwitch() {
  return <Switch />
}

export const muiSwitchData: TComponentData = {
  name: 'Switch',
  library: 'mui',
  component: <MuiSwitch />,
  tags: ['material ui', 'mui', 'switch', 'toggle', 'on', 'off'],
}
