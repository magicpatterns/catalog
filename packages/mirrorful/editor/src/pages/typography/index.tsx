import React from 'react'
import { TypographySection } from '@mirrorful/core/lib/components/Typography/TypographySection'
import useMirrorfulStore from 'src/zustand/useMirrorfulStore'
import { TTypographyData } from '@mirrorful/core/lib/types'
import postStoreData from 'src/utils/postStoreData'
import { Layout } from '..'
function Typography() {
  const { typography, colors, shadows, setTypography, fileTypes } =
    useMirrorfulStore((state) => state)
  const handleUpdateTypography = async (data: TTypographyData) => {
    setTypography(data)
    await postStoreData({
      tokens: { colorData: colors, typography: data, shadows },
      files: fileTypes,
    })
  }
  return (
    <Layout>
      <TypographySection
        typography={{ fontSizes: typography.fontSizes }}
        onUpdateTypography={handleUpdateTypography}
      ></TypographySection>
    </Layout>
  )
}

export default Typography
