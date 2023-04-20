import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Heading } from '.'

const meta: Meta<typeof Heading> = {
  title: 'Heading',
  component: Heading,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Heading>

export const Heading1: Story = {
  render: Heading,
  args: { label: 'Heading1', variants: 'h1' },
}
