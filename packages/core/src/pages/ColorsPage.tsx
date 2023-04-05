import { ColorPaletteSection } from '@core/components/ColorPalette/ColorPaletteSection'
import useMirrorfulStore, {
  MirrorfulState,
} from '@core/store/useMirrorfulStore'
import { TColorData, TConfig } from '@core/types'

export function ColorsPage({
  postStoreData,
}: {
  postStoreData: (data: TConfig) => Promise<void>
}) {
  const { colors, typography, shadows, fileTypes, setColors } =
    useMirrorfulStore((state: MirrorfulState) => state)

  const handleUpdateColors = async (data: TColorData[]) => {
    setColors(data)
    await postStoreData({
      tokens: {
        typography,
        colorData: data,
        shadows,
      },
      files: fileTypes,
    })
  }

  return (
    <ColorPaletteSection colors={colors} onUpdateColors={handleUpdateColors} />
  )
}
