import Layout from '@core/components/Layout'
import React from 'react'

export function LayoutWrapper({
  children,
  storeId,
}: {
  children: React.ReactNode
  storeId: string
}) {
  return (
    <Layout storeId={storeId} platform="web">
      {children}
    </Layout>
  )
}
