import { CheckCircleIcon, InfoIcon, WarningIcon } from '@chakra-ui/icons'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Text } from '.'
import { Styles } from './types'

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
      'xs/normal',
      'xs/medium',
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
      'sm/normal',
      'sm/medium',
      'sm/semibold',
      'sm/bold',
      'sm/extrabold',
      'sm/black',
    ] as Styles[],
  },
}

export const Large = {
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
      'lg/hairline',
      'lg/thin',
      'lg/light',
      'lg/normal',
      'lg/medium',
      'lg/semibold',
      'lg/bold',
      'lg/extrabold',
      'lg/black',
    ] as Styles[],
  },
}

export const Extra_Large = {
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
      'xl/hairline',
      'xl/thin',
      'xl/light',
      'xl/normal',
      'xl/medium',
      'xl/semibold',
      'xl/bold',
      'xl/extrabold',
      'xl/black',
    ] as Styles[],
  },
}

export const Hover: Story = {
  render: Text,
  args: {
    styles: 'md/normal',
    hover: {
      backgroundColor: 'white',
      color: 'black',
    },
    label: 'Hover Over Me',
    paddingBlock: 1,
    paddingInline: 1,
    maxWidth: 'max-content',
  },
}

export const VariantError: Story = {
  render: Text,
  args: {
    styles: 'md/normal',
    label: 'An Error has Occurred',
    maxWidth: 'max-content',
    variants: 'error',
    icon: <WarningIcon />,
  },
}

export const Variant_Success: Story = {
  render: Text,
  args: {
    styles: 'md/normal',
    label: 'You have successfully saved a color!',
    maxWidth: 'max-content',
    variants: 'success',
    icon: <CheckCircleIcon />,
  },
}

export const Variant_Info: Story = {
  render: Text,
  args: {
    styles: 'md/normal',
    label: 'You have been informed!',
    maxWidth: 'max-content',
    variants: 'info',
    icon: <InfoIcon />,
  },
}
