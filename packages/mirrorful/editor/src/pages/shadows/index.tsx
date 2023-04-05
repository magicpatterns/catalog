import { ShadowsPage } from '@mirrorful/core/lib/pages/ShadowsPage'
import React from 'react'
import { postStoreData } from 'src/utils/postStoreData'

export default function Shadows() {
  return <ShadowsPage postStoreData={postStoreData} />
}
