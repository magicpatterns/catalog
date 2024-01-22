import TextField from '@mui/material/TextField'

import { TComponentData } from '@/types'

export function MuiTextField() {
  return <TextField id="standard-basic" label="Standard" variant="standard" />
}

export const muiTextFieldData: TComponentData = {
  name: 'Text Field',
  library: 'mui',
  component: <MuiTextField />,
  tags: ['material ui', 'mui', 'text field'],
  docsLink: 'https://mui.com/material-ui/react-text-field/',
}
