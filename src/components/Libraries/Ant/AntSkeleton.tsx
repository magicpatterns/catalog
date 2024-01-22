import { Skeleton } from 'antd'

import { TComponentData } from '@/types'

export function AntSkeleton() {
  return <Skeleton />
}

export const antSkeletonData: TComponentData = {
  name: 'Skeleton',
  library: 'ant',
  component: <AntSkeleton />,
  tags: ['ant', 'skeleton', 'loading', 'facade'],
  docsLink: 'https://ant.design/components/skeleton',
}
