import { Layout } from 'src/components/Layout'

import { ColorPaletteSection } from '../../components/ColorPalette/ColorPaletteSection'
import useMirrorfulStore, {
  MirrorfulState,
} from '../../store/useMirrorfulStore'
import { TColorData, TConfig } from '../../types'

export default function Colors({
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
