'use client'
import ShadowsPage from '@core/pages/shadows'
import { defaultConfig, TConfig } from '@core/types'
import LayoutWrapper from '@web/components/LayoutWrapper'
import { useLocalStorage } from '@web/hooks/useLocalStorage'
import React from 'react'

export default function Shadows() {
  const [, setData] = useLocalStorage<TConfig>(
    'mirrorfulConfigData',
    defaultConfig
  )
  return (
    <LayoutWrapper>
      <ShadowsPage
        postStoreData={async (newData: TConfig) => {
          setData(newData)
        }}
      />
    </LayoutWrapper>
  )
}
