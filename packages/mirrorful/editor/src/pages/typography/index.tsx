import React from 'react'
import { TypographySection } from '@mirrorful/core/lib/components/Typography/TypographySection'
import useMirrorfulStore from 'src/zustand/useMirrorfulStore'
function Typography() {
  const typography = useMirrorfulStore((state) => state.typography)
  return (
    <TypographySection
      typography={{ fontSizes: typography.fontSizes }}
      onUpdateTypography={() => {}}
    ></TypographySection>
  )
}

export default Typography
