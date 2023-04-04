import TypographyPage from '@mirrorful/core/lib/pages/typography'
import React from 'react'
import LayoutWrapper from 'src/components/LayoutWrapper'
import postStoreData from 'src/utils/postStoreData'

export default function Typography() {
  return (
    <LayoutWrapper>
      <TypographyPage postStoreData={postStoreData} />
    </LayoutWrapper>
  )
}
