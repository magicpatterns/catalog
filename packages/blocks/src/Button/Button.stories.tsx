import { EditIcon } from '@chakra-ui/icons'
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
  render: Button,
  args: { label: 'Default' },
}
