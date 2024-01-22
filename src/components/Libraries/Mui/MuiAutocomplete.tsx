import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

import { TComponentData } from '@/types'

const options = ['The Godfather', 'Pulp Fiction']

export function MuiAutocomplete() {
  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  )
}

export const muiAutocompleteData: TComponentData = {
  name: 'Autocomplete',
  library: 'mui',
  component: <MuiAutocomplete />,
  tags: ['material ui', 'mui', 'autocomplete'],
}
