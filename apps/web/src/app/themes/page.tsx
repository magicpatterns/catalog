'use client'
import { ThemesPage } from '@core/pages/ThemesPage'
import { usePostStoreData } from '@web/hooks/usePostStoreData'
import React from 'react'

export default function Themes() {
  const [postStoreData] = usePostStoreData()

  return <ThemesPage postStoreData={postStoreData} />
}
