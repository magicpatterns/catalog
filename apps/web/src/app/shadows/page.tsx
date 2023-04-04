'use client'
import ShadowsPage from '@core/pages/shadows'
import LayoutWrapper from '@web/components/LayoutWrapper'
import usePostStoreData from '@web/hooks/usePostStoreData'
import React from 'react'

export default function Shadows() {
  const [postStoreData] = usePostStoreData()
  return (
    <LayoutWrapper>
      <ShadowsPage postStoreData={postStoreData} />
    </LayoutWrapper>
  )
}
