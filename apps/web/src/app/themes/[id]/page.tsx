import { ThemeEditorPage } from '@core/pages/ThemeEditorPage'
import React from 'react'

export default function ThemeEditor({ params }: { params: { id: string } }) {
  return <ThemeEditorPage themeId={params.id} />
}
