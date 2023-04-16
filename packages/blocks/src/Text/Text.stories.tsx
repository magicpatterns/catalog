import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Styles, Text } from '.'

const meta: Meta<typeof Text> = {
  title: 'Text',
  component: Text,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Text>

export const Extra_Small = {
  render: ({ styles }: { styles: Partial<Styles>[] }) => {
    return (
      <div>
        {styles.map((style) => {
          return <Text label={style} styles={style} key={style}></Text>
        })}
      </div>
    )
  },
  args: {
    styles: [
      'xs/hairline',
      'xs/thin',
      'xs/light',
      'xs/medium',
      'xs/normal',
      'xs/semibold',
      'xs/bold',
      'xs/extrabold',
      'xs/black',
    ] as Styles[],
  },
}

export const Small = {
  render: ({ styles }: { styles: Partial<Styles>[] }) => {
    return (
      <div>
        {styles.map((style) => {
          return <Text label={style} styles={style} key={style}></Text>
        })}
      </div>
    )
  },
  args: {
    styles: [
      'sm/hairline',
      'sm/thin',
      'sm/light',
      'sm/medium',
      'sm/normal',
      'sm/semibold',
      'sm/bold',
      'sm/extrabold',
      'sm/black',
    ] as Styles[],
  },
}
