'use client'
import { ThemeEditorPage } from '@core/pages/ThemeEditorPage'
import { usePostStoreData } from '@web/hooks/usePostStoreData'
import React from 'react'

export default function ThemeEditor({ params }: { params: { id: string } }) {
  const [postStoreData] = usePostStoreData()

  return <ThemeEditorPage themeId={params.id} postStoreData={postStoreData} />
}
