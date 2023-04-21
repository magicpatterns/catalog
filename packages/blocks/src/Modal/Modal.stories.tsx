import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { Button } from '../Button'
import {
  AddModal,
  DeleteModal,
  Modal,
  ModalFooter,
  ModalHeader,
  SaveModal,
} from '.'

const meta: Meta<typeof Modal> = {
  title: 'Modal',
  component: Modal,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Modal>

export const Generic_Modal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button
          label="open generic modal"
          variant="default"
          onClick={() => setIsOpen(true)}
        ></Button>
        <Modal
          header={<ModalHeader headerName="generic modal" />}
          footer={
            <ModalFooter
              variant="generic"
              PrimaryButton={
                <Button
                  label="ok"
                  variant="save"
                  onClick={() => alert('This is a generic modal!')}
                />
              }
              SecondaryButton={
                <Button
                  label="cancel"
                  variant="default"
                  onClick={() => setIsOpen(false)}
                />
              }
            />
          }
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          body={<></>}
          overlay={true}
        ></Modal>
      </>
    )
  },
}

export const Save_Modal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button
          label="open save modal"
          variant="save"
          onClick={() => setIsOpen(true)}
        ></Button>
        <SaveModal
          size={'xl'}
          overlay={true}
          body={<></>}
          headerName="Save Modal"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          mainCb={() => alert('This is being saved!')}
          closeCb={() => setIsOpen(false)}
        ></SaveModal>
      </>
    )
  },
}

export const Add_Modal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button
          label="open add modal"
          variant="add-token"
          onClick={() => setIsOpen(true)}
        ></Button>
        <AddModal
          headerName="Add Modal"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          mainCb={() => alert('This is being added!')}
          closeCb={() => setIsOpen(false)}
          body={<></>}
          overlay={true}
        ></AddModal>
      </>
    )
  },
}

export const Delete_Modal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button
          label="open delete modal"
          variant="delete"
          onClick={() => setIsOpen(true)}
        ></Button>
        <DeleteModal
          headerName="delete modal"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          mainCb={() => alert('This is being deleted!')}
          closeCb={() => setIsOpen(false)}
          body={<></>}
          overlay={true}
        ></DeleteModal>
      </>
    )
  },
}
