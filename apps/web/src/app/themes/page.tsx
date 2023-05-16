'use client'
import { ThemesPage } from '@core/pages/ThemesPage'
import { useFetchStoreId } from '@web/hooks/useFetchStoreId'
import React from 'react'

export default function Themes() {
  const [fetchStoreId] = useFetchStoreId()

  return <ThemesPage fetchStoreId={fetchStoreId} />
}
