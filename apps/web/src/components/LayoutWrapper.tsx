import Layout from '@core/components/Layout'
import usePostStoreData from '@web/hooks/usePostStoreData'
import React from 'react'

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [postStoreData] = usePostStoreData()
  return (
    <Layout postStoreData={postStoreData} platform="web">
      {children}
    </Layout>
  )
}
