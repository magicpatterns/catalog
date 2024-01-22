import Button from '@mui/material/Button'

import { TComponentData } from '@/types'

export function MuiButton() {
  return <Button>Button</Button>
}

export const muiButtonData: TComponentData = {
  name: 'Button',
  library: 'mui',
  component: <MuiButton />,
  tags: ['material ui', 'mui', 'button'],
  docsLink: 'https://mui.com/material-ui/react-button/',
}
