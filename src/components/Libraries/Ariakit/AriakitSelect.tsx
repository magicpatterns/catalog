import './Selectstyle.css'

import * as Ariakit from '@ariakit/react'

import { TComponentData } from '@/types'

export function AriakitSelect() {
  const select = Ariakit.useSelectStore({ defaultValue: 'Apple' })
  return (
    <div className="wrapper">
      <Ariakit.SelectLabel store={select}>Favorite fruit</Ariakit.SelectLabel>
      <Ariakit.Select store={select} className="button" />
      <Ariakit.SelectPopover
        store={select}
        gutter={4}
        sameWidth
        className="popover"
      >
        <Ariakit.SelectItem className="select-item" value="Apple" />
        <Ariakit.SelectItem className="select-item" value="Banana" />
        <Ariakit.SelectItem className="select-item" value="Grape" disabled />
        <Ariakit.SelectItem className="select-item" value="Orange" />
      </Ariakit.SelectPopover>
    </div>
  )
}

export const ariakitSelectData: TComponentData = {
  name: 'Select',
  library: 'ariakit',
  component: <AriakitSelect />,
  tags: ['ariakit', 'select'],
  docsLink: 'https://ariakit.org/components/select',
}
