import { FloatButton } from 'antd'

import { TComponentData } from '@/types'

export function AntFloatButton() {
  return <FloatButton />
}

export const antFloatButtonData: TComponentData = {
  name: 'Float Button',
  library: 'ant',
  component: <AntFloatButton />,
  tags: ['ant', 'button', 'float button'],
  docsLink: 'https://ant.design/components/float-button',
}
