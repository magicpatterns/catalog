'use client'
import { TypographyPage } from '@core/pages/TypographyPage'
import { usePostStoreData } from '@web/hooks/usePostStoreData'
import React from 'react'

export default function Typography() {
  const [postStoreData] = usePostStoreData()
  return <TypographyPage postStoreData={postStoreData} />
}
