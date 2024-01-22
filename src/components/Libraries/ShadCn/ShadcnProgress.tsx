import React from 'react'

import { TComponentData } from '@/types'

import { Progress } from './raw/ui/progress'

export function ShadcnProgress() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} className="w-[60%]" />
}

export const shadcnProgressData: TComponentData = {
  name: 'Progress',
  library: 'shadcn',
  component: <ShadcnProgress />,
  tags: ['shadcn', 'progress'],
  docsLink: 'https://ui.shadcn.com/docs/components/progress',
}
