import React from 'react'
import { ShadowsSection } from '@mirrorful/core/lib/components/Shadows/ShadowsSection'
import useMirrorfulStore from 'src/zustand/useMirrorfulStore'

function Shadows() {
  const { typography, colors, shadows, setTypography, fileTypes } =
    useMirrorfulStore((state) => state)
  return (
    <ShadowsSection
      onUpdateShadowData={() => {}}
      shadows={shadows}
    ></ShadowsSection>
  )
}

export default Shadows
