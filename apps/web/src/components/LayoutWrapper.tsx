import Layout from '@core/components/Layout'
import { defaultConfig, TConfig } from '@core/types'
import { useLocalStorage } from '@web/hooks/useLocalStorage'
import React from 'react'

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [, setData] = useLocalStorage<TConfig>(
    'mirrorfulConfigData',
    defaultConfig
  )
  return (
    <Layout
      postStoreData={async (newData: TConfig) => {
        setData(newData)
      }}
      platform="web"
    >
      {children}
    </Layout>
  )
}

export default LayoutWrapper
