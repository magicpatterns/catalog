import { ColorPaletteSection } from '@mirrorful/core/lib/components/ColorPalette/ColorPaletteSection'
import useMirrorfulStore, {
  MirrorfulState,
} from '@mirrorful/core/lib/store/useMirrorfulStore'
import { TColorData } from '@mirrorful/core/lib/types'
import postStoreData from '@mirrorful/core/lib/utils/postStoreData'
import Head from 'next/head'
import { Layout } from 'src/components/Layout'

export default function Editor({ isLoading }: { isLoading: boolean }) {
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
    <>
      <Head>
        <title>Mirrorful Editor</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content="Local editor for your design system"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout isLoading={isLoading}>
        <ColorPaletteSection
          colors={colors}
          onUpdateColors={handleUpdateColors}
        />
      </Layout>
    </>
  )
}
