import { Alert } from 'antd'

import { TComponentData } from '@/types'

export function AntAlert() {
  return <Alert message="Error!" type="error" />
}

export const antAlertData: TComponentData = {
  name: 'Alert',
  library: 'ant',
  component: <AntAlert />,
  tags: ['ant', 'alert', 'feedback', 'message'],
  docsLink: 'https://ant.design/components/alert',
}
