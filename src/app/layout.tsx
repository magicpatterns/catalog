import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@radix-ui/themes/styles.css'
import 'react-loading-skeleton/dist/skeleton.css'
import { PosthogProvider } from '@/components/PosthogProvider'

const inter = Inter({ subsets: ['latin'] })

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <PosthogProvider>
        <body className={inter.className}>{children}</body>
      </PosthogProvider>

      <script async defer src="https://buttons.github.io/buttons.js"></script>
    </html>
  )
}
