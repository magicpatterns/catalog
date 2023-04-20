import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Modal } from '.'

const meta: Meta<typeof Modal> = {
  title: 'Modal',
  component: Modal,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Modal>

export const SaveModal: Story = {
  render: Modal,
  args: { variant: 'save', children: <></>, isOpen: true },
}

export const AddModal: Story = {
  render: Modal,
  args: { variant: 'add', children: <></>, isOpen: true },
}

export const DeleteModal: Story = {
  render: Modal,
  args: { variant: 'delete', children: <></>, isOpen: true },
}
