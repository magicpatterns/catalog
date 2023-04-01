import { ColorPaletteSection } from '@mirrorful/core/lib/components/ColorPalette/ColorPaletteSection'
import { TColorData } from '@mirrorful/core/lib/types'
import Head from 'next/head'
import { Layout } from 'src/components/Layout'
import postStoreData from 'src/utils/postStoreData'
import useMirrorfulStore from 'src/zustand/useMirrorfulStore'

export default function Editor({ isLoading }: { isLoading: boolean }) {
  const { colors, typography, shadows, fileTypes, setColors } =
    useMirrorfulStore((state) => state)

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
      {/* <Dashboard
        fetchStoreData={async () => {
          const response = await fetch('/api/config')
          const data: TConfig = await response.json()

          return data
        }}
        postStoreData={async (data) => {
          await fetch('/api/export', {
            method: 'POST',
            body: JSON.stringify(data),
          })
        }}
      /> */}
    </>
  )
}
