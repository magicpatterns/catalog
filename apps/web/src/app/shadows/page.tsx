'use client'
import { ShadowsPage } from '@core/pages/ShadowsPage'
import { usePostStoreData } from '@web/hooks/usePostStoreData'
import React from 'react'

export default function Shadows() {
  const [postStoreData] = usePostStoreData()
  return <ShadowsPage postStoreData={postStoreData} />
}
