import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Button } from '.'

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  render: (args) => <Button {...args} />,
  args: { label: 'Default', variant: 'primary', size: 'md' },
}
