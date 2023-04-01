import { ColorPaletteSection } from '@mirrorful/core/lib/components/ColorPalette/ColorPaletteSection'
import { Layout } from '@mirrorful/core/lib/components/Layout'
import useMirrorfulStore, {
  MirrorfulState,
} from '@mirrorful/core/lib/store/useMirrorfulStore'
import { TColorData } from '@mirrorful/core/lib/types'
import postStoreData from '@mirrorful/core/lib/utils/postStoreData'

export default function Colors() {
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
