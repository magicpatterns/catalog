import type { Meta, StoryObj } from '@storybook/react'

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
  args: { label: 'Heading 1', variants: 'h1' },
}

export const Heading2: Story = {
  render: Heading,
  args: { label: 'Heading 2', variants: 'h2' },
}

export const Heading3: Story = {
  render: Heading,
  args: { label: 'Heading 3', variants: 'h3' },
}

export const Heading4: Story = {
  render: Heading,
  args: { label: 'Heading 4', variants: 'h4' },
}

export const Heading5: Story = {
  render: Heading,
  args: { label: 'Heading 5', variants: 'h5' },
}

export const Heading6: Story = {
  render: Heading,
  args: { label: 'Heading 6', variants: 'h6' },
}
