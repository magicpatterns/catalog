import './Toolbarstyle.css'

import * as Ariakit from '@ariakit/react'

import { TComponentData } from '@/types'

export function AriakitToolbar() {
  const toolbar = Ariakit.useToolbarStore()
  return (
    <Ariakit.Toolbar store={toolbar} className="toolbar">
      <Ariakit.ToolbarItem className="button secondary">
        Undo
      </Ariakit.ToolbarItem>
      <Ariakit.ToolbarItem className="button secondary" disabled>
        Redo
      </Ariakit.ToolbarItem>
      <Ariakit.ToolbarSeparator className="separator" />
      <Ariakit.ToolbarItem className="button secondary">
        Bold
      </Ariakit.ToolbarItem>
      <Ariakit.ToolbarItem className="button secondary">
        Italic
      </Ariakit.ToolbarItem>
      <Ariakit.ToolbarItem className="button secondary">
        Underline
      </Ariakit.ToolbarItem>
    </Ariakit.Toolbar>
  )
}

export const ariakitToolbarData: TComponentData = {
  name: 'Toolbar',
  library: 'ariakit',
  component: <AriakitToolbar />,
  tags: ['ariakit', 'toolbar'],
  docsLink: 'https://ariakit.org/components/toolbar',
}
