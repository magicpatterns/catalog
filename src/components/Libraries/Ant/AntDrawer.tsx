import { Button, Drawer } from 'antd'
import { useState } from 'react'

import { TComponentData } from '@/types'

export function AntDrawer() {
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  )
}

export const antDrawerData: TComponentData = {
  name: 'Drawer',
  library: 'ant',
  component: <AntDrawer />,
  tags: ['ant', 'drawer'],
  docsLink: 'https://ant.design/components/drawer',
}
