import Skeleton from '@mui/material/Skeleton'

import { TComponentData } from '@/types'

export function MuiSkeleton() {
  return <Skeleton variant="rounded" width={70} height={30} />
}

export const muiSkeletonData: TComponentData = {
  name: 'Skeleton',
  library: 'mui',
  component: <MuiSkeleton />,
  tags: ['material ui', 'mui', 'skeleton', 'loader', 'loading', 'facade'],
  docsLink: 'https://mui.com/material-ui/react-skeleton/',
}
