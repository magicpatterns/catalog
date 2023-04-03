import React from 'react'
import { Layout } from 'src/components/Layout'

import { ShadowsSection } from '../../components/Shadows/ShadowsSection'
import useMirrorfulStore, {
  MirrorfulState,
} from '../../store/useMirrorfulStore'
import { TConfig, TShadowData } from '../../types'

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
