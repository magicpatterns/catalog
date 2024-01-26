import { Theme } from '@radix-ui/themes'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Catalog',
  description: 'A collection of design patterns for the web.',
  openGraph: {
    title: 'Find the perfect component.',
  },
  twitter: {
    title: 'Find the perfect component.',
  },
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
