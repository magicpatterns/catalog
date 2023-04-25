import { ArrowBackIcon, EditIcon } from '@chakra-ui/icons'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Link } from '.'

const meta: Meta<typeof Link> = {
  title: 'Link',
  component: Link,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Link>

export const Icon_Link: Story = {
  render: Link,
  args: {
    label: 'Link',
    href: 'http://www.google.com',
    icon: <EditIcon />,
  },
}

export const Nav_Link: Story = {
  render: Link,
  args: {
    label: 'Nav Link',
    href: 'http://www.google.com',
    icon: <ArrowBackIcon />,
    color: 'gray.600',
    variants: 'md/semibold',
  },
}
