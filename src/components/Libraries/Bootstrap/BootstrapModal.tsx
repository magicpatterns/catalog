import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import { TComponentData } from '@/types'

export function BootstrapModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      <Modal show={isOpen} onHide={() => setIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>Some Modal Content</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export const bootstrapModalData: TComponentData = {
  name: 'Modal',
  library: 'bootstrap',
  component: <BootstrapModal />,
  tags: ['bootstrap', 'modal'],
  docsLink: 'https://react-bootstrap.netlify.app/docs/components/modal',
}
