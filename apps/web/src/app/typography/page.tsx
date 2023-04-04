'use client'
import TypographyPage from '@core/pages/typography'
import { defaultConfig, TConfig } from '@core/types'
import LayoutWrapper from '@web/components/LayoutWrapper'
import { useLocalStorage } from '@web/hooks/useLocalStorage'
import React from 'react'

function Typography() {
  const [, setData] = useLocalStorage<TConfig>(
    'mirrorfulConfigData',
    defaultConfig
  )
  return (
    <LayoutWrapper>
      <TypographyPage
        postStoreData={async (newData: TConfig) => {
          setData(newData)
        }}
      />
    </LayoutWrapper>
  )
}

export default Typography
