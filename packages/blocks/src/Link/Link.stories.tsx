import type { Meta, StoryObj } from '@storybook/react'

import { Link } from '.'

const meta: Meta<typeof Link> = {
  title: 'Link',
  component: Link,
  //👇 Enables auto-generated documentation for the component story
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Link>

export const Default: Story = {
  render: Link,
  args: {
    label: 'Link',
    href: 'https://www.mirrorful.com/',
    isExternal: true,
  },
}
