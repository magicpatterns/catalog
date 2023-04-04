import { defaultConfig, TConfig } from '@core/types'
import React from 'react'

import { useLocalStorage } from './useLocalStorage'

export default function useFetchStoreData() {
  const [data] = useLocalStorage<TConfig>('mirrorfulConfigData', defaultConfig)

  const fetchStoreData = async () => {
    return data
  }

  return [fetchStoreData] as const
}
