'use client'
import ColorsPage from '@core/pages/colors'
import LayoutWrapper from '@web/components/LayoutWrapper'
import usePostStoreData from '@web/hooks/usePostStoreData'
import React from 'react'

export default function Colors() {
  const [postStoreData] = usePostStoreData()
  return (
    <LayoutWrapper>
      <ColorsPage postStoreData={postStoreData} />
    </LayoutWrapper>
  )
}
