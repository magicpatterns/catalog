import { ShadowsSection } from '@mirrorful/core/lib/components/Shadows/ShadowsSection'
import { TShadowData } from '@mirrorful/core/lib/types'
import React from 'react'
import postStoreData from 'src/utils/postStoreData'
import useMirrorfulStore from 'src/zustand/useMirrorfulStore'

import { Layout } from '..'

function Shadows() {
  const { typography, colors, shadows, setShadows, fileTypes } =
    useMirrorfulStore((state) => state)
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
      ></ShadowsSection>
    </Layout>
  )
}

export default Shadows
