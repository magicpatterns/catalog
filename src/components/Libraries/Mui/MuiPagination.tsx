import Pagination from '@mui/material/Pagination'

import { TComponentData } from '@/types'

export function MuiPagination() {
  return <Pagination count={11} defaultPage={6} siblingCount={0} size="small" />
}

export const muiPaginationData: TComponentData = {
  name: 'Pagination',
  library: 'mui',
  component: <MuiPagination />,
  tags: ['material ui', 'mui', 'pagination'],
  docsLink: 'https://mui.com/material-ui/react-pagination/',
}
