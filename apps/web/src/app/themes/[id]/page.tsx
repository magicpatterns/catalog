import { ThemeEditorPage } from '@core/pages/ThemeEditorPage'
import { useFetchStoreId } from '@web/hooks/useFetchStoreId'
import React from 'react'

export default function ThemeEditor({ params }: { params: { id: string } }) {
  const [fetchStoreId] = useFetchStoreId()
  return <ThemeEditorPage themeId={params.id} fetchStoreId={fetchStoreId} />
}
