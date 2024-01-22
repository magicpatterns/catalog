import { Button, Modal } from 'antd'
import { useState } from 'react'

import { TComponentData } from '@/types'

export function AntModal() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
}

export const antModalData: TComponentData = {
  name: 'Modal',
  library: 'ant',
  component: <AntModal />,
  tags: ['ant', 'modal'],
  docsLink: 'https://ant.design/components/modal',
}
