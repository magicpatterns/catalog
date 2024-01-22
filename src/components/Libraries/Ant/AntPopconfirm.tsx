import { Button, Popconfirm } from 'antd'

import { TComponentData } from '@/types'

export function AntPopconfirm() {
  return (
    <Popconfirm
      title="Delete the task"
      description="Are you sure to delete this task?"
      okText="Yes"
      cancelText="No"
    >
      <Button danger>Delete</Button>
    </Popconfirm>
  )
}

export const antPopconfirmData: TComponentData = {
  name: 'Popconfirm',
  library: 'ant',
  component: <AntPopconfirm />,
  tags: ['ant', 'popconfirm', 'popover', 'popup', 'message'],
  docsLink: 'https://ant.design/components/popconfirm',
}
