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
  const {
    colors,
    typography,
    shadows,
    fileTypes,
    metadata,
    setColors,
    themes,
  } = useMirrorfulStore((state: MirrorfulState) => state)

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
      metadata,
    })
  }
  return (
    <ColorPaletteSection colors={colors} onUpdateColors={handleUpdateColors} />
  )
}
