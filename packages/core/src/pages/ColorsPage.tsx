'use client'
import { postStoreData } from '@core/client/store'
import { ColorPaletteSection } from '@core/components/ColorPalette/ColorPaletteSection'
import useMirrorfulStore, {
  MirrorfulState,
} from '@core/store/useMirrorfulStore'
import { TTokenGroup } from '@core/types'
import { useAuthInfo } from '@propelauth/react'

export function ColorsPage({
  fetchStoreId,
}: {
  fetchStoreId: () => Promise<string>
}) {

  const setColors = useMirrorfulStore(
    (state: MirrorfulState) => state.setColors
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
  const metadata = useMirrorfulStore(
     (state: MirrorfulState) => state.metadata
  )

  const authInfo = useAuthInfo()

  const handleUpdateColors = async (data: TTokenGroup) => {
    setColors(data)

    const storeId = await fetchStoreId()
    await postStoreData({
      newData: {
        primitives: {
          colors: data,
          typography,
          shadows,
        },
        themes,
        files: fileTypes,
        metadata,
      },
      authInfo: authInfo,
      storeId: storeId,
    })
  }
  return (
    <ColorPaletteSection colors={colors} onUpdateColors={handleUpdateColors} />
  )
}
