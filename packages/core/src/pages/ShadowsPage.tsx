import { ShadowsSection } from '@core/components/Shadows/ShadowsSection'
import useMirrorfulStore, {
  MirrorfulState,
} from '@core/store/useMirrorfulStore'
import { TMirrorfulStore, TTokenGroup } from '@core/types'
import React from 'react'

export function ShadowsPage({
  postStoreData,
}: {
  postStoreData: (data: TMirrorfulStore) => Promise<void>
}) {
  const setShadows = useMirrorfulStore(
    (state: MirrorfulState) => state.setShadows
  )

  const colors = useMirrorfulStore((state: MirrorfulState) => state.colors)
  const typography = useMirrorfulStore(
    (state: MirrorfulState) => state.typography
  )
  const shadows = useMirrorfulStore((state: MirrorfulState) => state.shadows)
  const fileTypes = useMirrorfulStore(
    (state: MirrorfulState) => state.fileTypes
  )
  const themes = useMirrorfulStore((state: MirrorfulState) => state.themes)

  const handleUpdateShadows = async (data: TTokenGroup) => {
    setShadows(data)
    await postStoreData({
      primitives: { colors: colors, typography, shadows: data },
      themes,
      files: fileTypes,
    })
  }
  return (
    <ShadowsSection
      shadows={shadows}
      onUpdateShadowData={handleUpdateShadows}
    />
  )
}
