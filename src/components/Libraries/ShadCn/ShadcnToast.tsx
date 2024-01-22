import { TComponentData } from '@/types'

import { Button } from './raw/ui/button'
import { useToast } from './raw/ui/use-toast'

export function ShadcnToast() {
  const { toast } = useToast()

  return (
    <Button
      onClick={() => {
        toast({
          title: 'Scheduled: Catch up',
          description: 'Friday, February 10, 2023 at 5:57 PM',
        })
      }}
    >
      Show Toast
    </Button>
  )
}

export const shadcnToastData: TComponentData = {
  name: 'Toast',
  library: 'shadcn',
  component: <ShadcnToast />,
  tags: ['shadcn', 'toast'],
  docsLink: 'https://ui.shadcn.com/docs/components/toast',
}
