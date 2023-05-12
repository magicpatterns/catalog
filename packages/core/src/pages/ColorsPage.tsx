import { ColorPaletteSection } from '@core/components/ColorPalette/ColorPaletteSection'
import useMirrorfulStore, {
  MirrorfulState,
} from '@core/store/useMirrorfulStore'
import { TMirrorfulStore, TTokenGroup } from '@core/types'

export function ColorsPage({
  postStoreData,
}: {
  postStoreData: (data: TMirrorfulStore) => Promise<void>
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

  const handleUpdateColors = async (data: TTokenGroup) => {
    setColors(data)
    await postStoreData({
      primitives: {
        colors: data,
        typography,
        shadows,
      },
      themes,
      files: fileTypes,
    })
  }
  return (
    <ColorPaletteSection colors={colors} onUpdateColors={handleUpdateColors} />
  )
}
