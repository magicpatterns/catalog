import { TComponentData } from '@/types'

import { Skeleton } from './raw/ui/skeleton'

export function ShadcnSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

export const shadcnSkeletonData: TComponentData = {
  name: 'Skeleton',
  library: 'shadcn',
  component: <ShadcnSkeleton />,
  tags: ['shadcn', 'skeleton'],
  docsLink: 'https://ui.shadcn.com/docs/components/skeleton',
}
