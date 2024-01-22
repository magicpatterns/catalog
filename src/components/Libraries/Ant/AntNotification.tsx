import { Button, notification } from 'antd'

import { TComponentData } from '@/types'

export function AntNotification() {
  const [api, contextHolder] = notification.useNotification()

  const openNotification = () => {
    api.open({
      message: 'Title',
      description: 'An example notification.',
      duration: 0,
    })
  }

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={openNotification}>
        Open notification
      </Button>
    </>
  )
}

export const antNotificationData: TComponentData = {
  name: 'Notification',
  library: 'ant',
  component: <AntNotification />,
  tags: ['ant', 'notification'],
  docsLink: 'https://ant.design/components/notification',
}
