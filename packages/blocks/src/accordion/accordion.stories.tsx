import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import {
  Accordion,
  AccordionBody,
  AccordionContent,
  AccordionFooter,
  AccordionHeader,
} from './accordion'

const meta: Meta<typeof Accordion> = {
  title: 'Accordion',
  component: Accordion,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  render: (args) => (
    <Accordion>
      <AccordionHeader label="Accordion Header" {...args} />
      <AccordionBody>
        <AccordionContent>Accordion Content</AccordionContent>
        <AccordionFooter label={'Accordion Footer'} />
      </AccordionBody>
    </Accordion>
  ),
}
