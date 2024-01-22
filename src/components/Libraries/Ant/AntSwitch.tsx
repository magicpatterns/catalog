import { Switch } from 'antd'

import { TComponentData } from '@/types'

export function AntSwitch() {
  return <Switch defaultChecked />
}

export const antSwitchData: TComponentData = {
  name: 'Switch',
  library: 'ant',
  component: <AntSwitch />,
  tags: ['ant', 'switch', 'toggle', 'on', 'off'],
  docsLink: 'https://ant.design/components/switch',
}
