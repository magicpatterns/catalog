// YourComponent.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../../../src/Buttons'

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Button> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: '@mirrorful/Button',
  component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

export const ButtonMd: Story = {
  args: {
    title: 'Button',
    size: 'md',
  },
}
