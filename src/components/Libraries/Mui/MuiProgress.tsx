import CircularProgress from '@mui/material/CircularProgress'

import { TComponentData } from '@/types'

export function MuiProgress() {
  return <CircularProgress />
}

export const muiProgressData: TComponentData = {
  name: 'Progress',
  library: 'mui',
  component: <MuiProgress />,
  tags: ['material ui', 'mui', 'progress', 'loading', 'spinner'],
  docsLink: 'https://mui.com/material-ui/react-progress/',
}
