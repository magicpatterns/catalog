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
  const {
    typography,
    colors,
    shadows,
    setShadows,
    fileTypes,
    themes,
    metadata,
  } = useMirrorfulStore((state: MirrorfulState) => state)

  const handleUpdateShadows = async (data: TTokenGroup) => {
    setShadows(data)
    await postStoreData({
      primitives: { colors: colors, typography, shadows: data },
      themes,
      files: fileTypes,
      metadata,
    })
  }
  return (
    <ShadowsSection
      shadows={shadows}
      onUpdateShadowData={handleUpdateShadows}
    />
  )
}
