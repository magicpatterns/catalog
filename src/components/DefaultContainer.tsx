import { Container } from '@radix-ui/themes'
import React from 'react'

export function DefaultContainer({
  children,
  ...props
}: {
  children: React.ReactNode
} & React.ComponentProps<typeof Container>) {
  return (
    <Container
      size="3"
      px={{
        initial: '5',
        lg: '0',
      }}
      {...props}
    >
      {children}
    </Container>
  )
}
