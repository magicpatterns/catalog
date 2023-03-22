'use client'

import { Dashboard } from '@mirrorful/core/components/Dashboard'
import { TConfig, defaultConfig } from '@mirrorful/core/types'
import { useLocalStorage } from '@web/hooks/useLocalStorage'

export default function Home() {
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
