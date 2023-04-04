'use client'
import ColorsPage from '@core/pages/colors'
import { defaultConfig, TConfig } from '@core/types'
import LayoutWrapper from '@web/components/LayoutWrapper'
import { useLocalStorage } from '@web/hooks/useLocalStorage'
import React from 'react'

export default function Colors() {
  const [, setData] = useLocalStorage<TConfig>(
    'mirrorfulConfigData',
    defaultConfig
  )
  return (
    <LayoutWrapper>
      <ColorsPage
        postStoreData={async (newData: TConfig) => {
          setData(newData)
        }}
      />
    </LayoutWrapper>
  )
}
