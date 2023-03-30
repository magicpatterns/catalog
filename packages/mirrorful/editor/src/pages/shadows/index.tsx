import React from 'react'
import { ShadowsSection } from '@mirrorful/core/lib/components/Shadows/ShadowsSection'
import useMirrorfulStore from 'src/zustand/useMirrorfulStore'
import { TShadowData } from '@mirrorful/core/lib/types'
import postStoreData from 'src/utils/postStoreData'

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
    <ShadowsSection
      onUpdateShadowData={handleUpdateShadows}
      shadows={shadows}
    ></ShadowsSection>
  )
}

export default Shadows
