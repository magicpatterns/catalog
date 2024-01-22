import Link from '@mui/material/Link'

import { TComponentData } from '@/types'

export function MuiLink() {
  return <Link href="#">Link</Link>
}

export const muiLinkData: TComponentData = {
  name: 'Link',
  library: 'mui',
  component: <MuiLink />,
  tags: ['material ui', 'mui', 'link', 'navigation'],
  docsLink: 'https://mui.com/material-ui/react-link/',
}
