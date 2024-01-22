import Breadcrumbs from '@mui/material/Breadcrumbs'

import { TComponentData } from '@/types'

export function MuiBreadcrumbs() {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <div>One</div>
      <div>Two</div>
      <div>Three</div>
    </Breadcrumbs>
  )
}

export const muiBreadcrumbsData: TComponentData = {
  name: 'Breadcrumbs',
  library: 'mui',
  component: <MuiBreadcrumbs />,
  tags: ['material ui', 'mui', 'breadcrumbs', 'crumbs', 'navigation'],
  docsLink: 'https://mui.com/material-ui/react-breadcrumbs/',
}
