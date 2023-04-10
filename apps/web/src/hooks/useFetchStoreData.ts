import { defaultConfig, TConfig } from '@core/types'

import { useLocalStorage } from './useLocalStorage'

export function useFetchStoreData() {
  const [data] = useLocalStorage<TConfig>(
    'mirrorfulConfigDataV2',
    defaultConfig
  )

  const fetchStoreData = async () => {
    return data
  }

  return [fetchStoreData] as const
}
