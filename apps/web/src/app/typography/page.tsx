'use client'

import { TypographyPage } from '@core/pages/TypographyPage'
import { useFetchStoreId } from '@web/hooks/useFetchStoreId'
import React from 'react'

export default function Typography() {
  const [fetchStoreId] = useFetchStoreId()
  return <TypographyPage fetchStoreId={fetchStoreId} />
}
