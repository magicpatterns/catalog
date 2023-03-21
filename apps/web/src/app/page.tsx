'use client'

import { Dashboard } from '@mirrorful/core/lib/components/Dashboard'
import { TConfig, defaultConfig } from '@mirrorful/core/lib/types'
import { useLocalStorage } from '@web/hooks/useLocalStorage'

export default function Home() {
  const [data, setData] = useLocalStorage<TConfig>(
    'mirrorfulConfigData',
    defaultConfig
  )

  return (
    <Dashboard
      fetchStoreData={async () => {
        return data
      }}
      postStoreData={async (newData: TConfig) => {
        setData(newData)
      }}
    />
  )
}
