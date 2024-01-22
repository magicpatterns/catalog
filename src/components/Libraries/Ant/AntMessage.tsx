import { Button, message } from 'antd'

import { TComponentData } from '@/types'

export function AntMessage() {
  const [messageApi, contextHolder] = message.useMessage()

  const info = () => {
    messageApi.info('Hello, Ant Design!')
  }

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={info}>
        Display message
      </Button>
    </>
  )
}

export const antMessageData: TComponentData = {
  name: 'Message',
  library: 'ant',
  component: <AntMessage />,
  tags: ['ant', 'message', 'feedback'],
  docsLink: 'https://ant.design/components/message',
}
