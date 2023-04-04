import ColorsPage from '@mirrorful/core/lib/pages/colors'
import React from 'react'
import LayoutWrapper from 'src/components/LayoutWrapper'
import postStoreData from 'src/utils/postStoreData'

export default function Colors() {
  return (
    <LayoutWrapper>
      <ColorsPage postStoreData={postStoreData} />
    </LayoutWrapper>
  )
}
