import ShadowsPage from '@mirrorful/core/lib/pages/shadows'
import React from 'react'
import LayoutWrapper from 'src/components/LayoutWrapper'
import postStoreData from 'src/utils/postStoreData'

export default function Shadows() {
  return <ShadowsPage postStoreData={postStoreData} />
}
