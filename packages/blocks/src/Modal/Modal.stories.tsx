import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { Button } from '../Button'
import { Modal } from '.'

const meta: Meta<typeof Modal> = {
  title: 'Modal',
  component: Modal,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Modal>

export const SaveModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button
          label="open save modal"
          variant="save"
          onClick={() => setIsOpen(true)}
        ></Button>
        <Modal
          headerName="Save Modal"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          mainCb={() => alert('This is being saved!')}
          variant="save"
        >
          <></>
        </Modal>
      </>
    )
  },
  args: {
    variant: 'save',
    children: <></>,
    isOpen: false,
    headerName: 'Save Modal',
  },
}

export const AddModal: Story = {
  render: Modal,
  args: {
    variant: 'add',
    children: <></>,
    isOpen: true,
    headerName: 'Save Modal',
  },
}

export const DeleteModal: Story = {
  render: Modal,
  args: {
    variant: 'delete',
    children: <></>,
    isOpen: true,
    headerName: 'Save Modal',
  },
}
