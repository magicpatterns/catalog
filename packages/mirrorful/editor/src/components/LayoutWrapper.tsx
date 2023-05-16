import Layout from '@mirrorful/core/lib/components/Layout'
import { TMirrorfulStore } from '@mirrorful/core/lib/types'
import { AuthProvider } from '@propelauth/react'
import React from 'react'

export function LayoutWrapper({
  children,
  postNextJsStore,
}: {
  postNextJsStore: (data: TMirrorfulStore) => Promise<void>
  children: React.ReactNode
}) {
  return (
    <AuthProvider
      authUrl={
        process.env.NEXT_PUBLIC_AUTH_URL ??
        'https://607430308.propelauthtest.com'
      }
    >
      <Layout postNextJsStore={postNextJsStore} platform="package">
        {children}
      </Layout>
    </AuthProvider>
  )
}
