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
  const authInfo = useAuthInfo()
  const { typography, colors, shadows, setShadows, fileTypes, themes } =
    useMirrorfulStore((state: MirrorfulState) => state)

  const handleUpdateShadows = async (data: TTokenGroup) => {
    setShadows(data)
    const storeId = await fetchStoreId()
    await postStoreData({
      newData: {
        primitives: { colors: colors, typography, shadows: data },
        themes,
        files: fileTypes,
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
