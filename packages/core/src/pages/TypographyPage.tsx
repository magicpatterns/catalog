'use client'

import { postStoreData } from '@core/client/store'
import { TypographySection } from '@core/components/Typography/TypographySection'
import useMirrorfulStore, {
  MirrorfulState,
} from '@core/store/useMirrorfulStore'
import { TPrimitivesTypography } from '@core/types'
import { useAuthInfo } from '@propelauth/react'

export function TypographyPage({
  fetchStoreId,
}: {
  fetchStoreId: () => Promise<string>
}) {
  const setTypography = useMirrorfulStore(
    (state: MirrorfulState) => state.setTypography
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

  const handleUpdateTypography = async (data: TPrimitivesTypography) => {
    setTypography(data)
    const storeId = await fetchStoreId()
    await postStoreData({
      newData: {
        primitives: { colors, typography: data, shadows },
        themes,
        files: fileTypes,
        metadata,
      },
      authInfo: authInfo,
      storeId,
    })
  }
  return (
    <TypographySection
      typography={{
        fontSizes: typography.fontSizes,
        fontWeights: typography.fontWeights,
        lineHeights: typography.lineHeights,
      }}
      onUpdateTypography={handleUpdateTypography}
    />
  )
}
