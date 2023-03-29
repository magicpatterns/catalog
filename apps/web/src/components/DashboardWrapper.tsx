'use client'

import { Dashboard } from '@mirrorful/core/components/Dashboard'
import { defaultConfig, TConfig } from '@mirrorful/core/types'
import { useLocalStorage } from '@web/hooks/useLocalStorage'

export function DashboardWrapper() {
  const [data, setData] = useLocalStorage<TConfig>(
    'mirrorfulConfigData',
    defaultConfig
  )

  return (
    <Dashboard
      platform="web"
      fetchStoreData={async () => {
        return data
      }}
      postStoreData={async (newData: TConfig) => {
        setData(newData)
      }}
    />
  )
}
