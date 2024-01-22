import './Menustyle.css'

import * as Ariakit from '@ariakit/react'

import { TComponentData } from '@/types'

export function AriakitMenu() {
  const menu = Ariakit.useMenuStore()
  return (
    <>
      <Ariakit.MenuButton store={menu} className="button">
        Actions
        <Ariakit.MenuButtonArrow />
      </Ariakit.MenuButton>
      <Ariakit.Menu store={menu} gutter={8} className="menu">
        <Ariakit.MenuItem className="menu-item" onClick={() => alert('Edit')}>
          Edit
        </Ariakit.MenuItem>
        <Ariakit.MenuItem className="menu-item">Share</Ariakit.MenuItem>
        <Ariakit.MenuItem className="menu-item" disabled>
          Delete
        </Ariakit.MenuItem>
        <Ariakit.MenuSeparator className="separator" />
        <Ariakit.MenuItem className="menu-item">Report</Ariakit.MenuItem>
      </Ariakit.Menu>
    </>
  )
}

export const ariakitMenuData: TComponentData = {
  name: 'Menu',
  library: 'ariakit',
  component: <AriakitMenu />,
  tags: ['ariakit', 'menu'],
  docsLink: 'https://ariakit.org/components/menu',
}
