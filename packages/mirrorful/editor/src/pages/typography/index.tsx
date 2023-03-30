import React from 'react'
import { TypographySection } from '@mirrorful/core/lib/components/Typography/TypographySection'
import useMirrorfulStore from 'src/zustand/useMirrorfulStore'
function Typography() {
  const fontSizes = useMirrorfulStore((state) => state.fontSizes)
  return (
    <TypographySection
      typography={{ fontSizes }}
      onUpdateTypography={() => {}}
    ></TypographySection>
  )
}

export default Typography
