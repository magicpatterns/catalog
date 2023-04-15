import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '.'

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  render: Button,
  args: { label: 'Default', variant: 'default' },
}

export const Save: Story = {
  render: Button,
  args: { label: 'save', variant: 'save' },
}

export const Delete: Story = {
  render: Button,
  args: { label: 'delete variant', variant: 'delete' },
}

export const Add_Token: Story = {
  render: Button,
  args: { label: 'Add New Color', variant: 'add-token' },
}
