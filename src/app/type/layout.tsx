import { Theme } from '@radix-ui/themes'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Patterns',
  description: 'A collection of design patterns for the web.',
}

export default function ComponentTypeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Theme accentColor="indigo" panelBackground="translucent">
      {children}
    </Theme>
  )
}
