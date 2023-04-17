import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '.'

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  render: Button,
  args: {},
}
