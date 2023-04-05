import Layout from '@core/components/Layout'
import { usePostStoreData } from '@web/hooks/usePostStoreData'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Mirrorful Editor',
  description: "Create, edit, and manage your app's theme.",
}
export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [postStoreData] = usePostStoreData()
  return (
    <Layout postStoreData={postStoreData} platform="web">
      {children}
    </Layout>
  )
}
