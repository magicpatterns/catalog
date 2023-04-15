import type { Meta, StoryObj } from '@storybook/react'

import { SaveButton } from '.'

const meta: Meta<typeof SaveButton> = {
  title: 'SaveButton',
  component: SaveButton,
}

export default meta
type Story = StoryObj<typeof SaveButton>

export const Primary: Story = {
  render: SaveButton,
  args: {},
}
