'use client'

import { Dashboard } from '@mirrorful/core/components/Dashboard'
import { defaultConfig, TConfig } from '@mirrorful/core/types'
import { useLocalStorage } from '@web/hooks/useLocalStorage'
import posthog from 'posthog-js'

if (typeof window !== 'undefined') {
  // This ensures that as long as we are client-side, posthog is always ready
  posthog.init('phc_Fi1SAV5Xhkmrf5VwIweTTmZDNnUIWmXkvXr7naLsNVV', {
    api_host: 'https://app.posthog.com',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.opt_out_capturing()
    },
  })
}

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
