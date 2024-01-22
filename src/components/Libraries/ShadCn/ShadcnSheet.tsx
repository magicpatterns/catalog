import { TComponentData } from '@/types'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './raw/ui/sheet'

export function ShadcnSheet() {
  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you sure absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export const shadcnSheetData: TComponentData = {
  name: 'Sheet',
  library: 'shadcn',
  component: <ShadcnSheet />,
  tags: ['shadcn', 'sheet'],
  docsLink: 'https://ui.shadcn.com/docs/components/sheet',
}
