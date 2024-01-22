import { Button } from 'antd'

import { TComponentData } from '@/types'

export function AntButton() {
  return <Button>Button</Button>
}

export const antButtonData: TComponentData = {
  name: 'Button',
  library: 'ant',
  component: <AntButton />,
  tags: ['ant', 'button'],
  docsLink: 'https://ant.design/components/button',
}
