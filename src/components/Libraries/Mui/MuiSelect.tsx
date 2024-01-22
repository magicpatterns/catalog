import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import { TComponentData } from '@/types'

export function MuiSelect() {
  return (
    <FormControl style={{ width: '100%' }}>
      <InputLabel id="demo-simple-select-label">Options</InputLabel>
      <Select labelId="demo-simple-select-label" label="Options">
        <MenuItem value={10}>One</MenuItem>
        <MenuItem value={20}>Two</MenuItem>
        <MenuItem value={30}>Three</MenuItem>
      </Select>
    </FormControl>
  )
}

export const muiSelectData: TComponentData = {
  name: 'Select',
  library: 'mui',
  component: <MuiSelect />,
  tags: ['material ui', 'mui', 'select'],
}
