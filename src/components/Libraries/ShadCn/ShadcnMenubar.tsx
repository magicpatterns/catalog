import { TComponentData } from '@/types'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from './raw/ui/menubar'

export function ShadcnMenubar() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>New Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Share</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export const shadcnMenubarData: TComponentData = {
  name: 'Menubar',
  library: 'shadcn',
  component: <ShadcnMenubar />,
  tags: ['shadcn', 'menubar'],
  docsLink: 'https://ui.shadcn.com/docs/components/menubar',
}
