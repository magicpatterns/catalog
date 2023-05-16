'use client'
import { ColorsPage } from '@core/pages/ColorsPage'
import { useFetchStoreId } from '@web/hooks/useFetchStoreId'
import React from 'react'

export default function Colors() {
  const [fetchStoreId] = useFetchStoreId()
  return <ColorsPage fetchStoreId={fetchStoreId} />
}
