import Layout from '@core/components/Layout'
import React from 'react'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return <Layout platform="web">{children}</Layout>
}
