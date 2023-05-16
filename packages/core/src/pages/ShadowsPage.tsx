'use client'

import { postStoreData } from '@core/client/store'
import { ShadowsSection } from '@core/components/Shadows/ShadowsSection'
import useMirrorfulStore, {
  MirrorfulState,
} from '@core/store/useMirrorfulStore'
import { TTokenGroup } from '@core/types'
import { useAuthInfo } from '@propelauth/react'

export function ShadowsPage() {
  const authInfo = useAuthInfo()
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
      newData: {
        primitives: { colors: colors, typography, shadows: data },
        themes,
        files: fileTypes,
        metadata,
      },
      authInfo: authInfo,
      storeId: '456',
    })
  }
  return (
    <ShadowsSection
      shadows={shadows}
      onUpdateShadowData={handleUpdateShadows}
    />
  )
}
