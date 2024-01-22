import { Button, Popover } from 'antd'

import { TComponentData } from '@/types'

export function AntPopover() {
  return (
    <Popover content={'Some content.'} title="Title">
      <Button type="primary">Hover me</Button>
    </Popover>
  )
}

export const antPopoverData: TComponentData = {
  name: 'Popover',
  library: 'ant',
  component: <AntPopover />,
  tags: ['ant', 'popover'],
  docsLink: 'https://ant.design/components/popover',
}
