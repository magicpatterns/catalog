'use client'
import { ShadowsPage } from '@core/pages/ShadowsPage'
import { useFetchStoreId } from '@web/hooks/useFetchStoreId'
import React from 'react'

export default function Shadows() {
  const [fetchStoreId] = useFetchStoreId()
  return <ShadowsPage fetchStoreId={fetchStoreId} />
}
