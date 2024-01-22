import { TComponentData } from '@/types'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './raw/ui/dialog'

export function ShadcnDialog() {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export const shadcnDialogData: TComponentData = {
  name: 'Dialog',
  library: 'shadcn',
  component: <ShadcnDialog />,
  tags: ['shadcn', 'dialog'],
  docsLink: 'https://ui.shadcn.com/docs/components/dialog',
}
