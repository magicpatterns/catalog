'use client'

import { postStoreData } from '@core/client/store'
import { ShadowsSection } from '@core/components/Shadows/ShadowsSection'
import useMirrorfulStore, {
  MirrorfulState,
} from '@core/store/useMirrorfulStore'
import { TTokenGroup } from '@core/types'
import { useAuthInfo } from '@propelauth/react'

export function ShadowsPage({
  fetchStoreId,
}: {
  fetchStoreId: () => Promise<string>
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
  const metadata = useMirrorfulStore((state: MirrorfulState) => state.metadata)

  const authInfo = useAuthInfo()

  const handleUpdateShadows = async (data: TTokenGroup) => {
    setShadows(data)
    const storeId = await fetchStoreId()
    await postStoreData({
      newData: {
        primitives: { colors: colors, typography, shadows: data },
        themes,
        files: fileTypes,
        metadata,
      },
      authInfo: authInfo,
      storeId,
    })
  }
  return (
    <ShadowsSection
      shadows={shadows}
      onUpdateShadowData={handleUpdateShadows}
    />
  )
}
