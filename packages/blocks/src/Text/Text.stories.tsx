import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Text } from '.'

const meta: Meta<typeof Text> = {
  title: 'Text',
  component: Text,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Text>

export const Default: Story = {
  render: Text,
  args: { label: 'Default', variants: 'md/normal' },
}
