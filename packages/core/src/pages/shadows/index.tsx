import { Layout } from '@core/components/Layout'
import { ShadowsSection } from '@core/components/Shadows/ShadowsSection'
import useMirrorfulStore, {
  MirrorfulState,
} from '@core/store/useMirrorfulStore'
import { TConfig, TShadowData } from '@core/types'
import React from 'react'

export default function Shadows({
  postStoreData,
}: {
  postStoreData: (data: TConfig) => Promise<void>
}) {
  const { typography, colors, shadows, setShadows, fileTypes } =
    useMirrorfulStore((state: MirrorfulState) => state)
  const handleUpdateShadows = async (data: TShadowData[]) => {
    setShadows(data)
    await postStoreData({
      tokens: { colorData: colors, typography, shadows: data },
      files: fileTypes,
    })
  }
  return (
    <Layout>
      <ShadowsSection
        onUpdateShadowData={handleUpdateShadows}
        shadows={shadows}
      />
    </Layout>
  )
}
