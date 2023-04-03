import { ColorPaletteSection } from '@core/components/ColorPalette/ColorPaletteSection'
import { Layout } from '@core/components/Layout'
import useMirrorfulStore, {
  MirrorfulState,
} from '@core/store/useMirrorfulStore'
import { TColorData, TConfig } from '@core/types'

export default function ColorsPage({
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
    <Layout>
      <ColorPaletteSection
        colors={colors}
        onUpdateColors={handleUpdateColors}
      />
    </Layout>
  )
}
