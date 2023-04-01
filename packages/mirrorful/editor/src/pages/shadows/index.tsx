import { Layout } from '@mirrorful/core/lib/components/Layout'
import { ShadowsSection } from '@mirrorful/core/lib/components/Shadows/ShadowsSection'
import useMirrorfulStore, {
  MirrorfulState,
} from '@mirrorful/core/lib/store/useMirrorfulStore'
import { TShadowData } from '@mirrorful/core/lib/types'
import postStoreData from '@mirrorful/core/lib/utils/postStoreData'
import React from 'react'

function Shadows() {
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

export default Shadows
