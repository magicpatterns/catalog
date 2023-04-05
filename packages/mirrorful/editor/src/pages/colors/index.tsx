import { ColorsPage } from '@mirrorful/core/lib/pages/ColorsPage'
import React from 'react'
import { postStoreData } from 'src/utils/postStoreData'

export default function Colors() {
  return <ColorsPage postStoreData={postStoreData} />
}
