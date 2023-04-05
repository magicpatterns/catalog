import Layout from '@mirrorful/core/lib/components/Layout'
import React from 'react'
import { postStoreData } from 'src/utils/postStoreData'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Layout platform="package" postStoreData={postStoreData}>
      {children}
    </Layout>
  )
}
